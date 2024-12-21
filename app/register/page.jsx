'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState} from "react";

const register = () => {

    const [eye, setEye] = useState("Show");
    const [type, setType] = useState("Password");
    const [userError, setUserError] = useState("");
    const [emailError, setEmailError] = useState("");
    const router = useRouter();

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value.trim();
        const email = e.target[1].value.trim();
        const password = e.target[2].value.trim();

        try{
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            });
            const resJson = await response.json();
            if (resJson.status === 201){
                router.push("/login");
            };
            if (resJson?.error === "Email already in use"){
                setEmailError('Email was already in used');
                setTimeout(() => setEmailError(""), 2000);
            }
            if (resJson?.error === "Username already in use"){
                setUserError('Username was already taken');
                setTimeout(() => setUserError(""), 2000);
            }
        }catch(error){ 
            console.log(error, 'Failed to register');
        }
    }
    
  return (
    <div className='transition-colors bg-orange-300/30 duration-300 hover:bg-orange-400/30 p-5 w-96 rounded-lg backdrop-blur-lg'>
        <h1 className="relo_text text-center pb-2 pt-2">Register</h1>
        <form onSubmit={handleSubmit} className="p-5">
            <input type="text" placeholder="Username" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300" required/>
            <p className="text-red ml-2 mb-5">{userError}</p>
            <input type="email" placeholder="Email" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300" required/>
            <p className="text-red ml-2 mb-5">{emailError}</p>
            <div className="focus:outline flex items-center w-full bg-white text-gray-700 border-b-2 rounded-lg border-gray-300 mb-5">
                <input type={type} placeholder="Password" className="m-0 pl-2.5 w-64 focus:outline-none" required/>
                <button type="button" className="h-12" onClick={check}>{eye}</button>
            </div>
            <button type="submit" className="font-medium transition-colors bg-primary-orange/80 duration-200 hover:bg-primary-orange p-2 rounded-lg w-full text">Submit</button>
        </form>
        <Link className="flex justify-center w-full px-full font-medium" href="/login">Login</Link>
    </div>
  )
}

export default register;