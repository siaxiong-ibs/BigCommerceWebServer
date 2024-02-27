import express from "express";
const router= express.Router();
import { FishBowlController } from "../../controllers/controller";
import { API_Authorization } from "../../middlewares/authenticateJWT";

router.post("/customerInventory",API_Authorization, FishBowlController.getCustomerInventory);
router.post("/newCustomerInventoryLocation", FishBowlController.createNewCustomerInventoryLocation)

export {router as FishBowlRouter};


