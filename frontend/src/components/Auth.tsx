import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignupInput } from '@shandilyaaryan/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import LabelledInput from './LabelledInput'

const Auth = ({type}: {type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup": "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/post");
        } catch (error) {
            alert("Error while signing up!")
        }
    }

  return (
    <div className='h-screen flex flex-col justify-center'>
        <div className='flex justify-center'>
            <div>
            <div className='px-20'>
            <div className='text-3xl font-extrabold text-center'>
                {type === "signin" ? "Welcome back!": "Create an account"}
            </div>
            <div className='text-slate-500 text-center'>
                {type === "signin" ? "Don't have an account?": "Already have an account?"}
                <Link className='underline pl-2' to={type === "signin"? '/signup': '/signin'}>{type === "signin"? 'Sign Up': 'Login'}</Link>
            </div>
            </div>
            <div>
                {/* @ts-ignore */}
                {type === "signup" ? <LabelledInput label={"Name"} placeholder={"Enter your name"} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setpostInputs((c) => ({...c, name: e.target.value}))
                }} /> : null}
                {/* @ts-ignore */}
                <LabelledInput label={"Username"} placeholder={"Enter your email"} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setpostInputs((c) => ({...c, email: e.target.value}))
                }} />
                {/* @ts-ignore */}
                <LabelledInput label={"Password"} type={"password"} placeholder={"Enter your password"} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setpostInputs((c) => ({...c, password: e.target.value}))
                }} />
                <button onClick={sendRequest} type="button" className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin" ? "Sign in": "Sign Up"}</button>
            </div>
        </div>
        </div> 
    </div>
  )
}

export default Auth

