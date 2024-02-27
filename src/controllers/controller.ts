import {Request, Response} from "express";
import * as FishBowl from "./fishBowlController/fishBowlController";
import * as BigCommerce from "./bigCommerceController/bigCommerceController";

const appendHandleError = function(router: Record<string,(req:Request, res:Response)=>Promise<unknown>>):Record<string,(req:Request,res:Response)=>void>{
	const objArr = Object.entries(router);

	const newObjArr = objArr.map(item=>{
		function HandleError(req:Request, res:Response){
			item[1](req,res).catch(e=>{
				console.log("&&&&&");
				console.log(e);
				console.log("&&&&&");

				res.status(400).json({Error:{name:e.name, msg:e.message}});

			});
		}	
		return [item[0], HandleError];
	});

	return Object.fromEntries(newObjArr);
};

export const BigCommerceController = appendHandleError(BigCommerce)
export const FishBowlController = appendHandleError(FishBowl);



