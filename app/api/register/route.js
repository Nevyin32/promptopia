import User from '@models/user';
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
    const {username, email, password} = await req.json();
    
    try{
        const res = await connectToDB();
    }catch(error){
        console.log(error);
    }
    
    const existingUser = await User.findOne({email});
    const existingUsername = await User.findOne({username});

    if (existingUser){
        return NextResponse.json({error:"Email already in use"}, {status: 400});
    }
    if (existingUsername){
        return NextResponse.json({error: "Username already in use"}, {status: 400});
    }
    
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username, email, password: hasedPassword});

    try{
        await newUser.save();
        return NextResponse.json({status: 201});
    }catch(error){
        return NextResponse.json({error:error}, {status:500});
    }
}