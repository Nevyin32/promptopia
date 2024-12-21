import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const token = req.cookies.get('token');
        console.log(token);
    }catch(error){
        console.log(error, ' inside route')
    }
}