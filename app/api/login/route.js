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
            const token = sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1s' });
            cookiesSet.set('token', token, {secure: true, httpOnly: true});
            return NextResponse.json({status: 200, message: "Login successful"});
        }
        else{
            return NextResponse.json({status: 400, message: "Password is wrong!"});
        }
    }else{
        return NextResponse.json({status:400, message:"Username not found."})
    }
}