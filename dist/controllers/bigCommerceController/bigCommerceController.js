"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewInventoryLocation = void 0;
const services_1 = require("../../services/services");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const axiosInstance = axios.create({
//     baseURL: `${process.env.BG_BASE_ENDPOINT}`,
//     timeout: 1000,
//     headers: {
//         "Accept":"application/json",
//         "authToken": `${process.env.BG_ACCESS_TOKEN}`
//     }
// })
const createNewInventoryLocation = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        const userPayload = yield services_1.BigCommerceService.getUserEmail(payload.data.id);
        const B2BUserPayload = yield services_1.BigCommerceService.getB2bCompanyUserUsingEmail(userPayload.data.data[0].email);
        const B2BUser = B2BUserPayload.data.data[0];
        if (B2BUser === null || B2BUser === void 0 ? void 0 : B2BUser.id) {
            try {
                const B2BCompanyUserMembers = yield services_1.BigCommerceService.getCompanyUserMembers(B2BUser.companyId);
                //only create new customer inventory location if its a new company (meaning it only one user at the moment)
                if (B2BCompanyUserMembers.data.data.length == 1) {
                    yield services_1.FishBowlService.createCustomerLocation(req, res, { location: `${B2BUser.firstName}${B2BUser.lastName}`,
                        customerCompanyId: B2BUser.companyId });
                    res.json({ status: "Customer location created!" });
                }
                else
                    res.status(400).json({ status: "The company already has a customer location because there's already a member of the company." });
            }
            catch (err) {
                console.log("err");
                console.log(err);
            }
        }
        else
            res.status(400).json({ status: `failed! bad BigCommerce Id : ${req.body.id}` });
    });
};
exports.createNewInventoryLocation = createNewInventoryLocation;
