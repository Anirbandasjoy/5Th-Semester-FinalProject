import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:3001/user/profile", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => navigate("/profile"))
            .catch((err) => {
                navigate("/");
            });
    }, []);

    const hendelLogin = () => {
        axios.post("http://localhost:3001/user/login", { email, password })
            .then((user) => {
                localStorage.setItem("token", user.data.token);
                toast("logged in successfully");
                navigate("/todo")
            })
            .catch(() => {
                if (!password || email) {
                    toast("invalid information")
                    navigate("/")
                }
            })
    }

    return (
        <div className="flex flex-col items-center justify-center h-[86vh] py-6 dark:bg-gray-700 bg-gray-50">
            <div className="w-full max-w-md">
                {/* <h2 className="text-2xl font-bold text-center dark:text-yellow-50 text-gray-800 mb-4">
                    Sign In
                </h2> */}
                <div className="bg-gray-600 dark:bg-gray-500 rounded-lg shadow-md p-8">
                    <div className="mb-4">
                        <label
                            className="block dark:text-yellow-50 text-gray-700 font-bold mb-2"
                            htmlFor="username"
                        >
                            email
                        </label>
                        <input

                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}

                            className="  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label

                            className="block  dark:text-yellow-50 text-gray-700 font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            className=" dark:text-gray-900 dark:bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={hendelLogin}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-white hover:text-red-200"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div onClick={() => {
                        navigate("/signUp")
                    }} className="mt-5 text-white hover:bg-green-600 bg-green-500 px-5 py-3 text-center rounded-md">
                        <button>Create new account</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default SignInForm;
