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
exports.getCustomerInventoryLocation = exports.createCustomerLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let fishBowlAccessToken = "null";
const refreshFishBowlAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fishBowlLogout();
    let resp = yield fishBowlLogin();
    fishBowlAccessToken = resp.data.token;
});
const firstTimeFishBowlLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = yield fishBowlLogin();
    fishBowlAccessToken = resp.data.token;
});
const fishBowlLogin = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`${process.env.FB_BASE_ENDPOINT}/login`);
        return (0, axios_1.default)({
            method: "post",
            baseURL: `${process.env.FB_BASE_ENDPOINT}/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                appName: process.env.FB_APP_NAME,
                appId: process.env.FB_APP_ID,
                username: process.env.FB_USERNAME,
                password: process.env.FB_PASSWORD
            }
        }).catch();
    });
};
const fishBowlLogout = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, axios_1.default)({
            method: "post",
            baseURL: `${process.env.FB_BASE_ENDPOINT}/logout`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${fishBowlAccessToken}`
            }
        });
    });
};
const createCustomerLocation = function (req, res, payload) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (fishBowlAccessToken == "null")
                yield firstTimeFishBowlLogin();
            return (0, axios_1.default)({
                method: "post",
                url: `${process.env.FB_BASE_ENDPOINT}/import/Locations`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": `Bearer ${fishBowlAccessToken}`
                },
                data: `[["Location","Description","Type","LocationGroup","Active","Available","Pickable","Receivable","CF-BigCommerce_Customer_Company_ID"], 
                ["${payload.location}",${payload.customerCompanyId},"Store Front","testCustomerInventoryGroup1","TRUE","FALSE","FALSE","TRUE","${payload.customerCompanyId}"]]`
            });
        }
        catch (err) {
            if (axios_1.default.isAxiosError(err)) {
                console.log(err.status);
                console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message);
                if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.message) == "The login limit of 9 users has been reached." || "Invalid authorization token.") {
                    yield refreshFishBowlAccessToken();
                }
            }
            else
                console.log(err);
        }
    });
};
exports.createCustomerLocation = createCustomerLocation;
const getCustomerInventoryLocation = function (req, res, companyId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("getCusotmerInventoryLocation() called!");
            if (fishBowlAccessToken == "null")
                yield firstTimeFishBowlLogin();
            const sqlData = yield (0, axios_1.default)({
                method: "get",
                url: `${process.env.FB_BASE_ENDPOINT}/data-query`,
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": `Bearer ${fishBowlAccessToken}`
                },
                data: `select * from location where description = "${companyId}"`
            });
            console.log(sqlData.data);
            if (!sqlData.data.length)
                return { status: "You have no inventory." };
            const inventoryFromLocaiton = yield (0, axios_1.default)({
                method: "get",
                url: `${process.env.FB_BASE_ENDPOINT}/parts/inventory?locationId=${sqlData.data[0].id}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${fishBowlAccessToken}`
                }
            });
            // console.log("**SQL Data Start");
            // console.log(sqlData.status);
            // console.log(sqlData.data);
            // console.log("**SQL Data End");
            // console.log("**inventoryFromLocaiton Start");
            // console.log(inventoryFromLocaiton.status);
            // console.log(inventoryFromLocaiton.data);
            // console.log("**inventoryFromLocaiton End");
            if (inventoryFromLocaiton.data.results.length == 0)
                return { status: "You have no inventory." };
            return inventoryFromLocaiton.data;
        }
        catch (err) {
            if (axios_1.default.isAxiosError(err)) {
                console.log(err.status);
                console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message);
                if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.message) == "The login limit of 9 users has been reached." || "Invalid authorization token.") {
                    yield refreshFishBowlAccessToken();
                }
            }
            else
                console.log(err);
        }
    });
};
exports.getCustomerInventoryLocation = getCustomerInventoryLocation;
