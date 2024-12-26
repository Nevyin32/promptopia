import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import Prompt from "@models/prompt";
import { cookies } from "next/headers";

export const POST = async (req) =>{
    const { prompt, tag} = await req.json();
    const cookiesSet = await cookies();
    const token = cookiesSet.get('token').value;
    if(token){
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.userId;
        try{
            await connectToDB();
            const newPrompt = await Prompt.create({creator: userId, prompt, tag});
            await newPrompt.save();
            return NextResponse.json({status:201});
        }catch(error){
            return NextResponse.json({status:500});
        }
    }
    
    
}