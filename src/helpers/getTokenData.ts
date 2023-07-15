import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "./interfaces";

export const getTokenData = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as JWTPayload;

        return decodedToken.id;
    } catch(err: any) {
        throw new Error(err.message);
    }
}