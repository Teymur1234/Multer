import React, { useState } from "react";

// Icons
import CloseEye from "../../Icons/CloseEye";
import OpenEye from "../../Icons/OpenEye";
import Envelope from "../../Icons/Envelope";

// React Router
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
// Hooks
import { useRef } from "react";
import { setUser } from "../../slices/user.slice.ts";

// Actions

const SignIn: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (emailRef.current &&
      passwordRef.current ) {
        const email = emailRef.current.value || "";
        const password = passwordRef.current.value || "";
        const response = await fetch("api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }) 
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
    
  }

  return (
    <div className="h-[600px] mx-auto w-1/4 flex items-center justify-center flex-col">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-bold">Welcome Back</h1>
        <h5 className="text-xs text-neutral-500 ">Login in to your account</h5>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Email */}
        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="email">
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

        {/* Password */}
        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="password">
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
              className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
            >
              {!showPassword && <CloseEye color="gray" className="w-5 h-5 " />}
              {showPassword && <OpenEye color="gray" className="w-5 h-5 " />}
            </span>
          </div>
        </div>

        <button className="w-full bg-lightOrange text-white p-2 rounded-xl hover:scale-95 transition-all duration-200">
          Sign In
        </button>
        <p className="text-center text-xs">
          Don't you have an account?{" "}
          <Link className="text-lightOrange" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
