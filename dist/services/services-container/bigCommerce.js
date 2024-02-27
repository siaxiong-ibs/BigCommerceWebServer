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
exports.getCompanyUserMembers = exports.getB2BCompanyUserUsingCustomerId = exports.getB2bCompanyUserUsingEmail = exports.getUserEmail = exports.getVariantImages = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axiosInstance_1 = require("../../util/axiosInstance");
dotenv_1.default.config();
const getVariantImages = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return axiosInstance_1.BG_NON_B2B_Axios_Instance.get("/catalog/products?limit=250&include=variants,images");
    });
};
exports.getVariantImages = getVariantImages;
const getUserEmail = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return axiosInstance_1.BG_NON_B2B_Axios_Instance.get(`/customers?id:in=${userId}`);
    });
};
exports.getUserEmail = getUserEmail;
const getB2bCompanyUserUsingEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return axiosInstance_1.BG_B2B_Axios_Instance.get(`/users?email=${email}`);
    });
};
exports.getB2bCompanyUserUsingEmail = getB2bCompanyUserUsingEmail;
const getB2BCompanyUserUsingCustomerId = function (customId) {
    return __awaiter(this, void 0, void 0, function* () {
        return axiosInstance_1.BG_B2B_Axios_Instance.get(`/users/${customId}`);
    });
};
exports.getB2BCompanyUserUsingCustomerId = getB2BCompanyUserUsingCustomerId;
const getCompanyUserMembers = function (companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return axiosInstance_1.BG_B2B_Axios_Instance.get(`/users?companyId=${companyId}`);
    });
};
exports.getCompanyUserMembers = getCompanyUserMembers;
