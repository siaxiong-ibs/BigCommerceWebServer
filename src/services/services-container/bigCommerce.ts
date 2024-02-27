import {Request, Response} from "express";
import axios from "axios";
import dotenv from "dotenv";
import { BG_B2B_Axios_Instance, BG_NON_B2B_Axios_Instance } from "../../util/axiosInstance";

dotenv.config();

export const getVariantImages = async function(){
    return BG_NON_B2B_Axios_Instance.get("/catalog/products?limit=250&include=variants,images");
}

export const getUserEmail = async function(userId: number){
    return BG_NON_B2B_Axios_Instance.get(`/customers?id:in=${userId}`);

}

export const getB2bCompanyUserUsingEmail = async function (email:string){
    return BG_B2B_Axios_Instance.get(`/users?email=${email}`)
}

export const getB2BCompanyUserUsingCustomerId = async function (customId: number){
    return BG_B2B_Axios_Instance.get(`/users/${customId}`);
}

export const getCompanyUserMembers = async function(companyId: number){
    return BG_B2B_Axios_Instance.get(`/users?companyId=${companyId}`);
}