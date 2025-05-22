import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { operationLogin, operationSignup } from '../services/operations/auth';
import { useDispatch } from 'react-redux';

function AuthTemplate({ type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Login function
    async function handleLogin() {
        await operationLogin(formData, navigate, dispatch);
    }

    // Signup function
    async function handleSignup() {
        await operationSignup(formData, navigate);
    }

    // Handle input changes
    function changeHandler(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    // Reset form when switching between login & signup
    useEffect(() => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    }, [type]);

    return (
        <div className="h-screen w-full flex">
            <div className={`${type === "login" ? "w-[40%]" : "w-[60%]"} md:w-[60%] w-full space-y-12 bg-white h-full ${type === "login" ? "p-16" : "p-12"}`}>
                <h1 className="text-4xl text-[#3751FE] font-bold">
                    E-Commerce for IIIT Buy-Sell-Rent
                </h1>
                <p className="text-[#00000099] font-medium">
                    Welcome back! Please {type === "login" ? "login" : "signup"} to your account.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className={`${type === "login" ? "space-y-5" : "space-y-4"}`}>
                    
                    {/* Signup: First & Last Name */}
                    {type === "signup" && (
                        <div className="flex items-center w-full space-x-4">
                            <div className="flex flex-col gap-2 w-1/2">
                                <label className="text-sm" htmlFor="firstName">First Name</label>
                                <input
                                    value={formData.firstName}
                                    name="firstName"
                                    onChange={changeHandler}
                                    className="inputClass"
                                    placeholder="Enter your First Name"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label className="text-sm" htmlFor="lastName">Last Name</label>
                                <input
                                    value={formData.lastName}
                                    name="lastName"
                                    onChange={changeHandler}
                                    className="inputClass"
                                    placeholder="Enter your Last Name"
                                    type="text"
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm" htmlFor="email">Email Address</label>
                        <input
                            value={formData.email}
                            name="email"
                            onChange={changeHandler}
                            className="inputClass"
                            placeholder="example@iiit.com"
                            type="text"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm" htmlFor="password">Password</label>
                        <input
                            value={formData.password}
                            name="password"
                            onChange={changeHandler}
                            className="inputClass"
                            placeholder="******"
                            type="password"
                        />
                    </div>

                    {/* Confirm Password for Signup */}
                    {type === "signup" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                onChange={changeHandler}
                                className="inputClass"
                                placeholder="******"
                                type="password"
                            />
                        </div>
                    )}

                    {/* Navigation between Login and Signup */}
                    <div>
                        {type === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <span onClick={() => navigate("/signup")} className="text-[#3751FE] cursor-pointer underline italic">
                                    Signup
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span onClick={() => navigate("/")} className="text-[#3751FE] cursor-pointer underline italic">
                                    Login
                                </span>
                            </>
                        )}
                    </div>

                    {/* Buttons for Login & Signup */}
                    {type === "login" ? (
                        <button
                            onClick={handleLogin}
                            className="px-6 py-2 outline-0 border-[1px] mt-4 bg-[#3751FE] text-white hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleSignup}
                            className="px-6 py-2 outline-0 border-[1px] border-[#3751FE] text-[#3751FE] hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
                        >
                            Signup
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AuthTemplate;
