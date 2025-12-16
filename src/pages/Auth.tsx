import React, { useState } from "react";
import resturant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../comp/auth/Register.js";
import Login from "../comp/auth/Login.js";



export default function Auth() {
  const [isRegistered, setRegistered] = useState<boolean>(false);


  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center">
        {/* BG img */}
        <img
          src={resturant}
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        {/* quote at the bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Serve the Customer as u like, Nobody will judge" <br />
          <span className="block mt-4 text-yellow-400">-Founder of Coffee</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Coffee"
            className="h-14 w-14 border-2
        rounded-full"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Coffee
          </h1>
        </div>
        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegistered ? "Registration" : "Login"}
        </h2>
        {/* component */}
        {isRegistered ? <Register setRegistered={setRegistered} /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegistered
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <a
            onClick={() => setRegistered(!isRegistered)}
            href="#"
            className="text-yellow-400 font-semibold hover:underline"
          >
            {isRegistered ? "Sign in" : "Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
}
