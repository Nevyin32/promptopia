import bcrypt from 'bcrypt';
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import User from '@models/user';
import {sign} from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const POST = async (req, res) => {
    const {username, password} = await req.json();
    const cookiesSet = await cookies();

    try{
        const res = await connectToDB();
    }catch(error){
        console.log(error);
    }
    
    const existingUser = await User.findOne({username});
    if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser?.password);
        if(isMatch) {
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1d' });
            const Image = existingUser.image;
            cookiesSet.set('token', token, {secure: true, httpOnly: true, path:'/', maxAge: 60*60*24});
            return NextResponse.json({status: 200, message: "Login successful", img:Image, userId: existingUser._id});
        }
        else{
            return NextResponse.json({status: 400, message: "Password is wrong!"});
        }
    }else{
        return NextResponse.json({status:400, message:"Username not found."})
    }
}