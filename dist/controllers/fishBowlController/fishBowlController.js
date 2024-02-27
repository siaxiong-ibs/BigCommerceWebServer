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
exports.getCustomerInventory = exports.createNewCustomerInventoryLocation = void 0;
const services_1 = require("../../services/services");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createNewCustomerInventoryLocation = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCustomerPayload = req.body;
        if (newCustomerPayload === null || newCustomerPayload === void 0 ? void 0 : newCustomerPayload.id) {
            const B2BCompanyUser = yield services_1.BigCommerceService.getB2BCompanyUserUsingCustomerId(newCustomerPayload.id);
            try {
                const B2BCompanyUserMembers = yield services_1.BigCommerceService.getCompanyUserMembers(B2BCompanyUser.data.data.companyId);
                //only create new customer inventory location if its a new company (meaning it only one user at the moment)
                if (B2BCompanyUserMembers.data.data.length == 1) {
                    yield services_1.FishBowlService.createCustomerLocation(req, res, { location: `${B2BCompanyUser.data.data.firstName}${B2BCompanyUser.data.data.lastName}`,
                        customerCompanyId: B2BCompanyUser.data.data.companyId });
                    res.status(200);
                }
                else
                    res.status(400).json({ status: "The company already has a customer location because there's already a member of the company." });
            }
            catch (err) {
                console.log("err");
            }
        }
        else
            res.status(400).json({ status: `failed! bad BigCommerce Id : ${req.body.id}` });
    });
};
exports.createNewCustomerInventoryLocation = createNewCustomerInventoryLocation;
const getCustomerInventory = function (req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const reqCustomerData = req.body.customer;
        const userData = yield services_1.BigCommerceService.getB2bCompanyUserUsingEmail(reqCustomerData.email);
        console.log("**b2b user email data start");
        console.log(userData.data);
        console.log("**b2b user email data end");
        if (userData.data.data.length == 0)
            return res.json({ status: "No inventory." });
        const companyId = (_b = (_a = userData.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.companyId;
        console.log("🚀 ~ getCustomerInventory ~ companyId:", companyId);
        const customerInventoryData = yield services_1.FishBowlService.getCustomerInventoryLocation(req, res, companyId);
        console.log("**cusotmerInventoryData Start**");
        console.log(customerInventoryData);
        console.log("**cusotmerInventoryData End**");
        const variantImagesData = yield services_1.BigCommerceService.getVariantImages();
        console.log("***start***");
        console.log(variantImagesData.data);
        console.log("***end***");
        let newArr = [];
        customerInventoryData.results.map(part => {
            console.log(part);
            let foundPart = variantImagesData.data.data.find(item => item.sku == part.partNumber);
            let status = true;
            for (let i = 0; i < variantImagesData.data.data.length; i++) {
                if (variantImagesData.data.data[i].sku === part.partNumber) {
                    newArr.push({ partNumber: variantImagesData.data.data[i].sku, image_url: variantImagesData.data.data[i].variants[0].image_url, description: variantImagesData.data.data[i].name, quantity: part.quantity });
                    status = false;
                }
                else if (variantImagesData.data.data[i].variants.find(item2 => item2.sku == part.partNumber)) {
                    variantImagesData.data.data[i].variants.find(item3 => {
                        if (item3.sku == part.partNumber) {
                            newArr.push({ partNumber: item3.sku, image_url: item3.image_url, description: variantImagesData.data.data[i].name, quantity: part.quantity });
                            status = false;
                        }
                    });
                }
            }
            if (status)
                newArr.push({ partNumber: part.partNumber, description: part.partDescription, quantity: part.quantity, image_url: "na" });
        });
        res.json(newArr);
    });
};
exports.getCustomerInventory = getCustomerInventory;
