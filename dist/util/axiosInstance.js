"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BG_NON_B2B_Axios_Instance = exports.BG_B2B_Axios_Instance = exports.fbAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.fbAxiosInstance = axios_1.default.create({
    baseURL: `${process.env.BG_BASE_ENDPOINT}`,
    timeout: 1000,
    headers: {
        "Accept": "application/json",
        "authToken": `${process.env.BG_ACCESS_TOKEN}`
    }
});
exports.BG_B2B_Axios_Instance = axios_1.default.create({
    baseURL: `${process.env.BG_BASE_ENDPOINT}`,
    headers: {
        "Accept": "application/json",
        "authToken": `${process.env.BG_ACCESS_TOKEN}`
    }
});
exports.BG_NON_B2B_Axios_Instance = axios_1.default.create({
    baseURL: `${process.env.BG_NON_B2B_ENDPOINT}`,
    headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.BG_NON_B2B_TOKEN
    }
});
