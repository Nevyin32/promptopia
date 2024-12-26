'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState} from "react";

const register = () => {

    const [eye, setEye] = useState("Show");
    const [submitting, setSubmitting] = useState(false);
    const [type, setType] = useState("Password");
    const [userError, setUserError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [previewImage, setPreviewImage] = useState('/assets/images/logo.svg');
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
        const email = e.target[1].value.trim();
        const password = e.target[2].value.trim();
        const imageBase64 = previewImage;

        try{
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password, image: imageBase64}),
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
        }finally{
            setSubmitting(false);
        }
    }
    // var loadFile = function(event) {
            
    //     var input = event.target;
    //     var file = input.files[0];
    //     var type = file.type;

    //     var output = document.getElementById('preview_img');

    //     output.src = URL.createObjectURL(event.target.files[0]);
    //         output.onload = function() {
    //             URL.revokeObjectURL(output.src) // free memory
    //         }
    // };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
          setPreviewImage(event.target.result);
        };
    
        reader.readAsDataURL(file);
    };
    
  return (
    <div className='transition-colors bg-orange-300/30 duration-300 hover:bg-orange-400/30 p-5 w-96 rounded-lg backdrop-blur-lg'>
        <h1 className="relo_text text-center pb-2 pt-2">Register</h1>
        <form onSubmit={handleSubmit} className="p-5">
            <input type="text" placeholder="Username" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300" required/>
            <p className="text-red ml-2 mb-5">{userError}</p>
            <input type="email" placeholder="Email" className="focus:outline-none w-full p-3 text-gray-700 border-b-2 rounded-lg border-gray-300" required/>
            <p className="text-red ml-2 mb-5">{emailError}</p>
            <div className="focus:outline flex items-center w-full bg-white text-gray-700 border-b-2 rounded-lg border-gray-300 mb-2">
                <input type={type} placeholder="Password" className="m-0 pl-2.5 w-64 focus:outline-none" required/>
                <button type="button" className="h-12" onClick={check}>{eye}</button>
            </div>
            <div className="focus:outline bg-white text-gray-700 border-b-2 rounded-lg pt-2 pb-1 my-5 border-gray-300">
                <h3 className="mx-3 text-gray-500 mb-2">Choose Profile Picture</h3>
                <div className="mx-3 flex items-center space-x-2 mb-2">
                    <div className="shrink-0 border-2 border-orange-400 rounded-full">
                        <img id='preview_img' className="h-14 w-14 object-cover rounded-full custom-position" src={previewImage} alt="/assets/images/logo.svg" />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-orange-700 hover:file:bg-orange-50" />
                    </label>
                </div>
            </div>
            <button type="submit" className="font-medium transition-colors bg-primary-orange/80 duration-200 hover:bg-primary-orange p-2 rounded-lg w-full text">Submit{submitting ? `...` : ``}</button>
        </form>
        <Link className="flex justify-center w-full px-full font-medium" href="/login">Login</Link>
    </div>
  )
}

export default register;