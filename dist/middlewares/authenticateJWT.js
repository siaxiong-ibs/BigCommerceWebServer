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
exports.API_Authorization = void 0;
const jose_1 = require("jose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_Authorization = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.header);
            let accessToken = req.body.authorization;
            const secret = new TextEncoder().encode(process.env.BG_DEVELOPER_CLIENT_SECRET);
            // accessToken = accessToken?.substring("Bearer ".length); 
            if (!(accessToken === null || accessToken === void 0 ? void 0 : accessToken.length))
                throw new Error("empty access token!");
            const { payload } = yield (0, jose_1.jwtVerify)(accessToken, secret);
            console.log("**JWT Payload Start**");
            console.log(payload);
            console.log("**JWT Payload End**");
            req.body.customer = payload.customer;
            console.log("**JWT req.body Start**");
            console.log(req.body.customer);
            console.log("**JWT req.body End**");
            next();
        }
        catch (error) {
            console.log("**JWT Validation Error Start**");
            console.log(error);
            console.log("**JWT Validation Error End**");
        }
    });
};
exports.API_Authorization = API_Authorization;
