"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigCommerceRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.BigCommerceRouter = router;
const controller_1 = require("../../controllers/controller");
router.post("/newCustomer", controller_1.BigCommerceController.createNewInventoryLocation);
