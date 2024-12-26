import { NextResponse } from "@node_modules/next/server";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    const { id } = await params;
    try{
        await connectToDB();
        const prompt = await Prompt.findById(id).populate('creator');
        if(!prompt){
            return NextResponse.json({message: 'Prompt not found', status:404})
        }else{
            return NextResponse.json(prompt, {status: 200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({status:500});
    }
}

export const PATCH = async (req, {params}) => {
    const { id } = await params;
    const {prompt, tag} = await req.json();
    try{
        await connectToDB();
        const updatedPrompt = await Prompt.findById(id);
        if(!updatedPrompt){
            return NextResponse.json({message: 'Prompt not found', status:404})
        }else{
            updatedPrompt.prompt = prompt;
            updatedPrompt.tag = tag;
            await updatedPrompt.save();
            return NextResponse.json(updatedPrompt, {status: 200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({status:500});
    }
}

export const DELETE = async (req, {params}) => {
    const { id } = await params;
    try{
        await connectToDB();
        const prompt = await Prompt.findByIdAndDelete(id);
        if(!prompt){
            return NextResponse.json({message: 'Prompt not found', status:404})
        }else{
            return NextResponse.json({message: 'Prompt deleted successfully', status:200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({status:500});
    }
}