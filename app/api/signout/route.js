import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    const cookieSet = await cookies();
    cookieSet.delete('token');
    return NextResponse.json({status: 204});
}