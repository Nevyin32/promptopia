'use client';
import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";

const login = () => {

  const [eye, setEye] = useState("Show");
  const [type, setType] = useState("Password");
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();

    try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password:password})
        });
        const resJson = await response?.json();
        if(resJson?.status === 200){
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('img', resJson.img)
          localStorage.setItem('userId', resJson.userId)
          router.push('/');
        }
    }catch(error){
        console.log(error, 'Failed to register');
    }finally{
      setSubmitting(false);
    }
  }
  
  return (
    <div className='transition-colors bg-orange-300/30 duration-300 hover:bg-orange-400/30 p-5 w-96 rounded-lg backdrop-blur-lg'>
        <h1 className="relo_text text-center pb-2 pt-2">Login</h1>
        <form className="p-5" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300 mb-5" required/>
            <div className="focus:outline flex items-center w-full bg-white text-gray-700 border-b-2 rounded-lg border-gray-300 mb-5">
                <input type={type} placeholder="Password" className="m-0 pl-2.5 w-64 focus:outline-none" required/>
                <button type="button" className="h-12" onClick={check}>{eye}</button>
            </div>
            <button type="submit" className="font-medium transition-colors bg-primary-orange/80 duration-200 hover:bg-primary-orange p-2 rounded-lg w-full text">Submit{submitting ? `...` : ``}</button>
        </form>
        <Link className="flex justify-center w-full px-full font-medium" href="/register">Register</Link>
    </div>
  )
}

export default login