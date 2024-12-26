import { NextResponse } from "@node_modules/next/server";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import Prompt from "@models/prompt";
import { cookies } from "@node_modules/next/headers";

export const GET = async(req, {params}) => {
    const { id } = await params;
    try{
        await connectToDB();
        const prompts = await Prompt.find({creator: id}).populate('creator');
        return NextResponse.json(prompts, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({status:500});
    }
}