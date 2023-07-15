import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'Logout successful',
            success: true
        }, { status: 200 });

        // Clear the cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}