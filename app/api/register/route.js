import User from '@models/user';
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
// const Bcrypt = require("bcrypt");

export const POST = async (req, res) => {
    const {username, email, password} = await req.json();

    try{
        const res = await connectToDB();
        console.log(res, " connected to MongoDB");
    }catch(error){
        console.log(error);
    }
    
    const existingUser = await User.findOne({email});
    const existingUsername = await User.findOne({username});

    if (existingUser){
        return new NextResponse("Email already exists", {status: 400});
    }

    if (existingUsername){
        return new NextResponse("Username already exists", {status: 400});
    }

    // const hasedPassword = await Bcrypt.hash(password, 10);
    const newUser = await User.create({username, email, password});

    try{
        await newUser.save();
        return new NextResponse("User created successfully", {status: 201});
    }catch(error){
        return new NextResponse(error, {status:500});
    }
}