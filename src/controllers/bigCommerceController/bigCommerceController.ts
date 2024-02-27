import {Request, Response} from "express";
import axios from "axios";
import { FishBowlService, BigCommerceService } from "../../services/services";
import dotenv from "dotenv";

dotenv.config();

interface webHook {
    scope: string,
    store_id: string,
    data: {
      type: string, 
      id: number
    },
    hash: string,
    created_at: number,
    producer: string
}

// const axiosInstance = axios.create({
//     baseURL: `${process.env.BG_BASE_ENDPOINT}`,
//     timeout: 1000,
//     headers: {
//         "Accept":"application/json",
//         "authToken": `${process.env.BG_ACCESS_TOKEN}`
//     }
// })

export const createNewInventoryLocation = async function(req: Request, res: Response){
    const payload:webHook = req.body;

    const userPayload = await BigCommerceService.getUserEmail(payload.data.id);

    const B2BUserPayload = await BigCommerceService.getB2bCompanyUserUsingEmail(userPayload.data.data[0].email)
    const B2BUser = B2BUserPayload.data.data[0];
    if(B2BUser?.id){
        try{
            const B2BCompanyUserMembers = await BigCommerceService.getCompanyUserMembers(B2BUser.companyId);            
            //only create new customer inventory location if its a new company (meaning it only one user at the moment)
            if(B2BCompanyUserMembers.data.data.length == 1) {

                await FishBowlService.createCustomerLocation(
                req,
                res,
                {location:`${B2BUser.firstName}${B2BUser.lastName}`,
                customerCompanyId:B2BUser.companyId}
             )
             res.json({status: "Customer location created!"})
            }
            else res.status(400).json({status: "The company already has a customer location because there's already a member of the company."})

        
        } catch(err){
            console.log("err")
            console.log(err);
        }
    }
    else res.status(400).json({status: `failed! bad BigCommerce Id : ${req.body.id}`})

}

