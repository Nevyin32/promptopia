import { NextResponse } from "next/server";

export function middleware(req, res){
    const cookiesSet = req.cookies.get('token');
    if(!cookiesSet){
        const response = NextResponse.next();
        response.cookies.set("clear-localStorage", "true",);
        if(req.url === 'http://localhost:3000/profile'){
           return NextResponse.redirect(new URL('/login', req.url))
        }
        if(req.url === 'http://localhost:3000/create-post'){
           return NextResponse.redirect(new URL('/login', req.url))
        }
        return response;
    }else{
        const response = NextResponse.next();
        response.cookies.set("clear-localStorage", "false",);
        return response;
    }
}
export const config = {
    matcher: [
        '/',
        '/profile',
        '/create-post',
        '/api/signout',
    ]

}