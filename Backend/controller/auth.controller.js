import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../generateTokenandSetCookie.js"


export const signup = async (request, response) => {
        const { userName, password, email, confirmPassword } = request.body;
        const { path } = request.file

             if(!path){
                return response.status(400).send({error:"Please upload on image"})
             }

        if (!userName || !password || !email || !confirmPassword) {
            return response.status(400).send({ error: "Please fill up all fields" });
        }

        const existingUser = await User.findOne({ userName });

        if (existingUser) {
            return response.status(400)
                .send({ error: "Username already in use" });
        }

        if (password !== confirmPassword) {
            return response.status(400).send({ error: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            userName,
            password: hashedPassword,
            profilePic: path
        });



        if (!newUser) {
            return response.status(404).send({ error: "User not created" })
        }
        generateTokenAndSetCookie(newUser._id, response)

        response.status(201).send(newUser);

    
};

export const signin = async (request, response) => {

        const { email, password } = request.body;


        if (!email || !password) {
            return response.status(400).send({ error: "Please fill up all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).send({ error: "Incrorrect username or password" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return response.status(401).send({ error: "Incrorrect username or password" });
        }

        generateTokenAndSetCookie(user._id, response)

        response.status(200).send({ user });

};
export const logout = async (request, response) => {
    response.cookie("jwt", "");
    response.status(200).send({ message: "Logged out succefully" })
}