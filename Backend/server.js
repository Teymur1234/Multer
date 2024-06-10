import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import router from "./Routers/auth.routes.js";
import userRoute from "./Routers/users.routes.js"
import multer from "multer"


const app = express();
dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;




const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, "./image")
    },
    filename: function (request, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", upload.single("profilePic"), router);
app.use("/api/users", userRoute)
app.use(express.static('./'))

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `MongoDB connected and listen PORT: ${PORT}`
            );
        })
    }
    )
    .catch((error) => {
        console.log(`error ${error}`);
    })
