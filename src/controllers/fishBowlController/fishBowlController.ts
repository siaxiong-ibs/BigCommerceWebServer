import {Request, Response} from "express";
import {FishBowlService, BigCommerceService} from "../../services/services"
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { fbAxiosInstance } from "../../util/axiosInstance";
import * as BG_Type from "../../util/BG_Custom_Types";
dotenv.config();



export const createNewCustomerInventoryLocation = async function(req:Request, res:Response){
    const newCustomerPayload:{type: string, id: number} | null = req.body; 

    if(newCustomerPayload?.id){
        const B2BCompanyUser = await BigCommerceService.getB2BCompanyUserUsingCustomerId(newCustomerPayload.id);
        try{
            const B2BCompanyUserMembers = await BigCommerceService.getCompanyUserMembers(B2BCompanyUser.data.data.companyId);            
            //only create new customer inventory location if its a new company (meaning it only one user at the moment)
            if(B2BCompanyUserMembers.data.data.length == 1) {

                await FishBowlService.createCustomerLocation(
                req,
                res,
                {location:`${B2BCompanyUser.data.data.firstName}${B2BCompanyUser.data.data.lastName}`,
                customerCompanyId:B2BCompanyUser.data.data.companyId}
             )
             res.status(200);
            }
            else res.status(400).json({status: "The company already has a customer location because there's already a member of the company."})

        
        } catch(err){
            console.log("err")
        }
    }
    else res.status(400).json({status: `failed! bad BigCommerce Id : ${req.body.id}`})


}

export const getCustomerInventory = async function(req:Request, res: Response){
    const reqCustomerData:{id:string,email:string,group_id:string} =req.body.customer;

    const userData = await BigCommerceService.getB2bCompanyUserUsingEmail(reqCustomerData.email);

    console.log("**b2b user email data start")
    console.log(userData.data);
    console.log("**b2b user email data end")
    if(userData.data.data.length == 0) return res.json({status:"No inventory."})

    const companyId = userData.data?.data[0]?.companyId;
    console.log("🚀 ~ getCustomerInventory ~ companyId:", companyId)
    
    const customerInventoryData:BG_Type.inventoryResult = await FishBowlService.getCustomerInventoryLocation(req,res, companyId);
    console.log("**cusotmerInventoryData Start**")
    console.log(customerInventoryData)
    console.log("**cusotmerInventoryData End**")
    const variantImagesData:BG_Type.VariantImage = await BigCommerceService.getVariantImages();


    console.log("***start***")
    console.log(variantImagesData.data);
    console.log("***end***")

    let newArr:{partNumber:string,image_url:string,description:string,quantity:string}[]=[];

    customerInventoryData.results.map(part=>{
        console.log(part)
        let foundPart = variantImagesData.data.data.find(item => item.sku == part.partNumber);
        let status = true;
        for(let i = 0; i< variantImagesData.data.data.length;i++){
    
          if(variantImagesData.data.data[i].sku === part.partNumber) {newArr.push({partNumber:variantImagesData.data.data[i].sku,image_url:variantImagesData.data.data[i].variants[0].image_url,description:variantImagesData.data.data[i].name, quantity:part.quantity});status = false;}
    
          else if (variantImagesData.data.data[i].variants.find(item2=> item2.sku == part.partNumber)){
              variantImagesData.data.data[i].variants.find(item3=>{
                if(item3.sku == part.partNumber){
                    newArr.push({partNumber:item3.sku,image_url:item3.image_url,description:variantImagesData.data.data[i].name,quantity:part.quantity});
                  status = false;
                }
              })
          }
        }
        if(status) newArr.push({partNumber:part.partNumber,description:part.partDescription,quantity:part.quantity, image_url:"na"});
        })



    res.json(newArr);
}

