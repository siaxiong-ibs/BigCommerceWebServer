import { Response, Request, NextFunction } from "express";
import { jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config();

export const API_Authorization = async function(req: Request, res: Response, next: NextFunction){
    try{
        console.log(req.header)
        let accessToken = req.body.authorization;
        const secret = new TextEncoder().encode(process.env.BG_DEVELOPER_CLIENT_SECRET);

        // accessToken = accessToken?.substring("Bearer ".length); 
		if(!accessToken?.length) throw new Error("empty access token!");

        const {payload} =  await jwtVerify(accessToken, secret);

        console.log("**JWT Payload Start**")
        console.log(payload);
        console.log("**JWT Payload End**")

        req.body.customer = payload.customer;

        console.log("**JWT req.body Start**")
        console.log(req.body.customer);
        console.log("**JWT req.body End**")


        next();
    }catch(error){
        console.log("**JWT Validation Error Start**");
        console.log(error)
        console.log("**JWT Validation Error End**");
    }
}