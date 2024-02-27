import express from "express";
const router= express.Router();
import { BigCommerceController } from "../../controllers/controller";
import { API_Authorization } from "../../middlewares/authenticateJWT";

router.post("/newCustomer", BigCommerceController.createNewInventoryLocation);

export {router as BigCommerceRouter};