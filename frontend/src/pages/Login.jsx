import React, { useContext, useState, useRef } from "react";
import { ThemeContext } from "../context/Theme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlices";
import toast from "react-hot-toast";

function Login() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      setError("Password is required");
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        }
      );
      dispatch(loginUser({ userData: response?.data?.user }));
      toast.success("Login Successfully");
      navigate("/");
      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div
      className={`${
        theme === "light" ? "light" : "dark"
      } h-screen flex justify-center items-center sm:px-10 overflow-auto`}
    >
      <div className="bg-white/50 w-[90%] md:w-[80%] lg:w-[50%] rounded-2xl p-5 mx-auto">
        <p
          className={`text-4xl font-play text-center ${
            theme === "light" ? "" : "text-white"
          } font-bold`}
        >
          Login
        </p>
        <form onSubmit={handleLogin} className="mt-10">
          <div>
            <label
              htmlFor="email"
              className={`${theme === "light" ? "" : "text-white"}`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 outline-0 w-[100%] px-4 py-2 bg-white/50 backdrop-blur-xl rounded-2xl mt-3"
              placeholder="Enter your email"
            />
            {error === "Email is required" && (
              <p className="text-[0.8rem] text-red-600">Email is required</p>
            )}
          </div>
          <div className="mt-5">
            <label
              htmlFor="password"
              className={`${theme === "light" ? "" : "text-white"}`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-0 outline-0 w-[100%] px-4 py-2 bg-white/50 backdrop-blur-xl rounded-2xl mt-3"
              placeholder="Enter your password"
            />
            {error === "Password is required" && (
              <p className="text-[0.8rem] text-red-600">Password is required</p>
            )}
          </div>
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              type="submit"
              className={`${
                theme === "light" ? "bg-dark-purple" : "bg-blue"
              } text-white hover:scale-105 text-nowrap transition-all text-sm sm:text-[1rem] cursor-pointer px-2 sm:px-7 py-1 sm:py-2 rounded-xl sm:rounded-2xl`}
            >
              Login
            </button>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`${
                  theme === "light" ? "text-purple-800" : "text-blue-800"
                }`}
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
