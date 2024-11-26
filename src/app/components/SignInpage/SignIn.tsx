"use client";
import {
  emailValidation,
  fullNameValidation,
  passwordValidation,
} from "@/app/contants";
import React, { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
const SignIn = () => {
  const [signIn, setSignUp] = useState(true);
  const userNameText = useRef<HTMLInputElement>(null);
  const emailText = useRef<HTMLInputElement>(null);
  const passwordText = useRef<HTMLInputElement>(null);

  const [signInError, setSignInError] = useState("");
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  console.log(userNameError, emailError, passwordError);
  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailText.current && passwordText.current && !signIn) {
      console.log(emailText.current.value,  passwordText.current.value)
      createUserWithEmailAndPassword(
        auth,
        emailText.current.value,
        passwordText.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
          // ..
        });
    }
  };
  const handleToggle = () => {
    setSignUp((prev) => !prev);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {signIn ? "Sign in to your account" : "Sign Up"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          {!signIn ? (
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={userNameText}
                  onChange={() => {
                    if (userNameText.current) {
                      setUserNameError(
                        fullNameValidation(userNameText.current.value)
                      );
                    }
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className=" text-red-500 text-sm">{userNameError}</p>
            </div>
          ) : null}
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                ref={emailText}
                onChange={() => {
                  if (emailText.current) {
                    setEmailError(emailValidation(emailText.current.value));
                  }
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <p className=" text-red-500 text-sm">{emailError}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordText}
                onChange={() => {
                  if (passwordText.current) {
                    setPasswordError(
                      passwordValidation(passwordText.current.value)
                    );
                  }
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <p className=" text-red-500 text-sm">{passwordError}</p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={submitForm}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className={"text-black mt-3"}>
          {!signIn ? "Aready a member?" : "Not a member?"}{" "}
          <strong className="cursor-pointer :" onClick={handleToggle}>
            {!signIn ? "Sign In" : "Sign Up"}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
