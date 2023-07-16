import { connect } from "@/dbConfig/config"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EmailType } from "@/helpers/interfaces";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName: username, email, password } = reqBody;

        console.log('##reqBody', reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // save the user
        const savedUser = await newUser.save();

        console.log("##savedUser", savedUser);

        // send verification email
        await sendEmail({ email, emailType: EmailType.VERIFY, userId: savedUser._id })


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            userInfo: {
                userName: savedUser.username,
                email: savedUser.email
            }
        }, {
            status: 201
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}