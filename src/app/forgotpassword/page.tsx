"use client";
import React, { useState } from "react";
import { useAppSelector } from "../Slice/ReduxStore";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

const page = () => {
  const ForgotEmail = () => {
    const [forgetEmail, setForgotEmail] = useState("");
    const handleSendEmail = () => {
      if(forgetEmail){
        sendPasswordResetEmail(auth, forgetEmail)
        .then(() => {
          console.log("sent");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      }
    };
    const handleChange = (e: any) => {
      setForgotEmail(e.target.value);
    };

    return (
      <div>
        <div className="mb-4 flex items-center gap-6">
          <label className="text-sm font-semibold text-gray-700 flex-shrink-0 flex items-center">
            Email
          </label>
          <div className="rounded-md shadow-sm flex-1 items-center">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="focus:ring-indigo-500 w-full py-2 px-5 focus:border-indigo-900 sm:text-sm border-gray-800 rounded-md shadow-lg focus:shadow-xl"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSendEmail}
        >
          Send Reset Link
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[80vh] items-center justify-center gap-3">
      <div className="w-[400px] my-5 p-4 flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-semibold my-2">Recover Password</h1>
          <p className="text-gray-600 text-sm">
            Let&apos;s quickly get you back into your account.
          </p>
        </div>
        <ForgotEmail />
        <div className="text-sm text-center text-gray-500">
          Privacy Policy | Terms of Service
        </div>
        <div className="flex justify-center space-x-4 mt-4"></div>
      </div>
    </div>
  );
};

export default page;
