import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3001/user/profile", {
            headers: {
                Authorization: token,
            }
        })
            .then(() => navigate("/profile"))
            .catch((err) => navigate("/SignUp"));
    }, []);

    const handleRegister = () => {
        axios.post("http://localhost:3001/user/register", { name, email, password, image })
            .then(() => {
                toast("Registration successful");
                navigate("/");
            })
            .catch((err) => {
                toast("Something went wrong");
                navigate("/signUp");
            });
    };

    return (
        <div className="flex flex-col items-center justify-center   py-6 dark:bg-gray-700 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-gray-600 dark:bg-gray-500 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-center dark:text-yellow-50 text-gray-800 mb-4">
                        Sign Up
                    </h2>
                    <div className="mb-4">
                        <label className="block dark:text-yellow-50 text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="dark:text-gray-900 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block dark:text-yellow-50 text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dark:text-gray-900 dark:bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-800 focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block dark:text-yellow-50 text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="dark:text-gray-900 dark:bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-800 focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block dark:text-yellow-50 text-gray-700 font-bold mb-2" htmlFor="image">
                            Image URL
                        </label>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="dark:text-gray-900 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            name="image"
                            type="text"
                            placeholder="Enter your Image URL"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleRegister}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <button
                            className="inline-block align-baseline font-bold text-sm text-white hover:text-red-200"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Already Logged In?
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
