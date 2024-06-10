import React, { ChangeEvent, FormEventHandler, useState } from "react";

// Icons
import OpenEye from "../../Icons/OpenEye";
import CloseEye from "../../Icons/CloseEye";
import Profile from "../../Icons/Profile";
import Envelope from "../../Icons/Envelope";
import Upload from "../../Icons/Upload.jsx";

// React Router
import { Link } from "react-router-dom";

// Hooks
import { useRef } from "react";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";

// Actions
import { setUser } from "../../slices/user.slice.ts";

const SignUp: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {

      setImage(event.target.files[0]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();

    const data = new FormData();

    if (
      emailRef.current &&
      passwordRef.current &&
      userNameRef.current &&
      confirmPasswordRef.current
    ) {
      const email = emailRef.current.value || "";
      const userName = userNameRef.current.value || "";
      const password = passwordRef.current.value || "";
      const confirmPassword = confirmPasswordRef.current.value || "";
      const imageValue = image || "";

      data.append("email", email);
      data.append("userName", userName);
      data.append("password", password);
      data.append("confirmPassword", confirmPassword);
      data.append("profilePic", imageValue);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: data,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return console.log(responseData.error);
      }

      const newUser = {
        email: responseData.email,
        userName: responseData.userName,
        _id: responseData._id,
        profilePic: responseData.profilePic,
        balance: responseData.balance,
      };

      dispatch(setUser(newUser));
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="h-[600px]  mx-auto w-1/4 flex items-center justify-center flex-col">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-bold">Welcome</h1>
        <h5 className="text-xs text-neutral-500 ">Create your account</h5>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Email */}
        <div className="w-full">
          <label className="text-gray-500 text-sm select-none" htmlFor="email">
            Email
          </label>
          <div className="relative h-10">
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="huseynmirzayev@code.edu.az"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange "
            />
            <Envelope
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
        </div>

        {/* Username */}
        <div className="w-full">
          <label
            className="text-gray-500 text-sm select-none"
            htmlFor="username"
          >
            Username
          </label>
          <div className="relative h-10">
            <input
              ref={userNameRef}
              type="text"
              id="username"
              placeholder="hsynmrzyv"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange "
            />
            <Profile
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="w-full">
          <label
            className="text-gray-500 text-sm select-none"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative h-10">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="6+ strong character"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
            />
            <span
              onClick={toggleShowPassword}
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
            >
              {!showPassword && <CloseEye color="gray" className="w-5 h-5 " />}
              {showPassword && <OpenEye color="gray" className="w-5 h-5 " />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label
            className="text-gray-500 text-sm select-none"
            htmlFor="confirmPassoword"
          >
            Confirm Password
          </label>
          <div className="relative h-10">
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
            />
            <span
              onClick={toggleShowConfirmPassword}
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
            >
              {!showConfirmPassword && (
                <CloseEye color="gray" className="w-5 h-5 " />
              )}
              {showConfirmPassword && (
                <OpenEye color="gray" className="w-5 h-5 " />
              )}
            </span>
          </div>
        </div>

        {/*Image */}
        <div className="w-full">
          <label className="text-gray-500 text-sm select-none" htmlFor="image">
            Profile Picture
          </label>
          <div className="relative h-10">
            <input
              type="file"
              id="image"
              onChange={handleChange}
              placeholder="Please select an image"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange opacity-0 z-10 cursor-pointer"
            />
            <span className="w-5 h-5 absolute top-1/2 -translate-y-1/2 ">
              <Upload color="gray" className="w-5 h-5 " />
            </span>
            <span className="text-gray-500 text-sm absolute top-1/2 left-6 -translate-y-1/2 ">
              {!image ? "Choose profile picture" : image.name}
            </span>
          </div>
        </div>

        <button className="w-full bg-lightOrange text-white p-2 rounded-xl hover:scale-95 transition-all duration-200">
          Sign Up
        </button>
        <p className="text-center text-xs">
          Do you have an account?{" "}
          <Link className="text-lightOrange" to="/sign-in">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
