import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/config";


connect();

export async function GET(request: NextRequest) {
    try {
        // Get the user id from the token
        const userId = getTokenData(request);

        const user = await User.findById(userId).select('-password');

        // Send the response
        return NextResponse.json({ message: 'User found!', data: user, success: true,  }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}