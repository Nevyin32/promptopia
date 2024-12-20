'use client';
import { useState } from "react";
import Link from "next/link"

const login = () => {

  const [eye, setEye] = useState("Show");
    const [type, setType] = useState("Password");

    const check = (e) => {
        if (eye === "Show") {
            setEye("Hide");
            setType("text");
        }
        else{
            setEye("Show");
            setType("Password");
        }
    }
  
  return (
    <div className='transition-colors bg-orange-300/30 duration-300 hover:bg-orange-400/30 p-5 w-96 rounded-lg backdrop-blur-lg'>
        <h1 className="relo_text text-center pb-2 pt-2">Login</h1>
        <form className="p-5">
            <input type="text" placeholder="Username" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300 mb-5" required/>
            <div className="focus:outline flex items-center w-full bg-white text-gray-700 border-b-2 rounded-lg border-gray-300 mb-5">
                <input type={type} placeholder="Password" className="m-0 pl-2.5 w-64 focus:outline-none" required/>
                <button type="button" className="h-12" onClick={check}>{eye}</button>
            </div>
            <button type="submit" className="font-medium transition-colors bg-primary-orange/80 duration-200 hover:bg-primary-orange p-2 rounded-lg w-full text">Submit</button>
        </form>
        <Link className="flex justify-center w-full px-full font-medium" href="/register">Register</Link>
    </div>
  )
}

export default login