"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishBowlController = exports.BigCommerceController = void 0;
const FishBowl = __importStar(require("./fishBowlController/fishBowlController"));
const BigCommerce = __importStar(require("./bigCommerceController/bigCommerceController"));
const appendHandleError = function (router) {
    const objArr = Object.entries(router);
    const newObjArr = objArr.map(item => {
        function HandleError(req, res) {
            item[1](req, res).catch(e => {
                console.log("&&&&&");
                console.log(e);
                console.log("&&&&&");
                res.status(400).json({ Error: { name: e.name, msg: e.message } });
            });
        }
        return [item[0], HandleError];
    });
    return Object.fromEntries(newObjArr);
};
exports.BigCommerceController = appendHandleError(BigCommerce);
exports.FishBowlController = appendHandleError(FishBowl);
