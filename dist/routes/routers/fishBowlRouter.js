"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishBowlRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.FishBowlRouter = router;
const controller_1 = require("../../controllers/controller");
const authenticateJWT_1 = require("../../middlewares/authenticateJWT");
router.post("/customerInventory", authenticateJWT_1.API_Authorization, controller_1.FishBowlController.getCustomerInventory);
router.post("/newCustomerInventoryLocation", controller_1.FishBowlController.createNewCustomerInventoryLocation);
