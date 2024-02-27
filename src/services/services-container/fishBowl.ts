import {Response, Request} from "express";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

let fishBowlAccessToken = "null";

const refreshFishBowlAccessToken = async ()=>{
    await fishBowlLogout();
    let resp = await fishBowlLogin();
    fishBowlAccessToken = resp.data.token;

}
const firstTimeFishBowlLogin = async ()=>{
    let resp = await fishBowlLogin();
    fishBowlAccessToken = resp.data.token;
}
const fishBowlLogin = async function(){
    console.log(`${process.env.FB_BASE_ENDPOINT}/login`)
    return axios({
        method:"post",
        baseURL: `${process.env.FB_BASE_ENDPOINT}/login`,
        headers: {
            "Content-Type":"application/json",
        },
        data: {
            appName: process.env.FB_APP_NAME,
            appId: process.env.FB_APP_ID,
            username: process.env.FB_USERNAME,
            password: process.env.FB_PASSWORD
        }

    }).catch()
}

const fishBowlLogout = async function(){
    return axios({
        method:"post",
        baseURL: `${process.env.FB_BASE_ENDPOINT}/logout`,
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${fishBowlAccessToken}`
        }
    })
}

export const createCustomerLocation = async function(req:Request,res:Response, payload: {location:string, customerCompanyId:number}){
        
    try{
        if(fishBowlAccessToken == "null") await firstTimeFishBowlLogin();

        return axios({
            method:"post",
            url: `${process.env.FB_BASE_ENDPOINT}/import/Locations`,
            headers:{
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": `Bearer ${fishBowlAccessToken}`
            },

            data:`[["Location","Description","Type","LocationGroup","Active","Available","Pickable","Receivable","CF-BigCommerce_Customer_Company_ID"], 
                ["${payload.location}",${payload.customerCompanyId},"Store Front","testCustomerInventoryGroup1","TRUE","FALSE","FALSE","TRUE","${payload.customerCompanyId}"]]`
        
        })

    }catch(err){
        if(axios.isAxiosError(err) ){
            console.log(err.status);
            console.log(err.response?.data.message)
            if(err.response?.data.message == "The login limit of 9 users has been reached." || "Invalid authorization token."){
                await refreshFishBowlAccessToken();
            }
        }
        else console.log(err);
    }
}


export const getCustomerInventoryLocation = async function(req: Request, res:Response, companyId:number){

    try{

        console.log("getCusotmerInventoryLocation() called!")
    if(fishBowlAccessToken == "null") await firstTimeFishBowlLogin();

    const sqlData = await axios({
        method:"get",
        url: `${process.env.FB_BASE_ENDPOINT}/data-query`,

        headers:{
            "Content-Type":"text/plain",
            "Authorization": `Bearer ${fishBowlAccessToken}`
        },
        data: `select * from location where description = "${companyId}"`
    })

    console.log(sqlData.data);

    if(!sqlData.data.length) return {status: "You have no inventory."};

    const inventoryFromLocaiton = await axios({
        method: "get",
        url: `${process.env.FB_BASE_ENDPOINT}/parts/inventory?locationId=${sqlData.data[0].id}`,
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${fishBowlAccessToken}`
        }
    })

    // console.log("**SQL Data Start");
    // console.log(sqlData.status);
    // console.log(sqlData.data);
    // console.log("**SQL Data End");
    
    // console.log("**inventoryFromLocaiton Start");
    // console.log(inventoryFromLocaiton.status);
    // console.log(inventoryFromLocaiton.data);
    // console.log("**inventoryFromLocaiton End");
    if(inventoryFromLocaiton.data.results.length == 0) return {status: "You have no inventory."}
    return inventoryFromLocaiton.data;

    }catch(err){
        if(axios.isAxiosError(err) ){
            console.log(err.status);
            console.log(err.response?.data.message)
            if(err.response?.data.message == "The login limit of 9 users has been reached." || "Invalid authorization token."){
                await refreshFishBowlAccessToken();
            }
        }
        else console.log(err);
    }
    
};


