import { NextResponse } from "@node_modules/next/server";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return NextResponse.json(prompts, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({status:500});
    }
}