import { connect } from "@/dbConfig/config"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest) {
    try {
        // Get the data from the request
        const reqBody = await request.json();

        const { email, password } = reqBody;

        console.log('##reqBody', reqBody);

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Inavid UserName or Password" }, { status: 400 });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Inavid UserName or Password" }, { status: 400 });
        }

        // Create jwt payload
        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Create Token
        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

        // Set the cookie
        const response = NextResponse.json({
            message: "Login successfull",
            success: true
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}