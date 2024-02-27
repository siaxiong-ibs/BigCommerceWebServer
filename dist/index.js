"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = require("./routes/routers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://ibs-implant.mybigcommerce.com" }));
const printRequestInfo = (req, resp, next) => {
    console.log("******** REQUEST INFO START*********");
    console.log(`METHOD: ${(req.method).toUpperCase()} ${req === null || req === void 0 ? void 0 : req.path}`);
    console.log(`BODY: ${JSON.stringify(req === null || req === void 0 ? void 0 : req.body)}`);
    console.log(`URL: ${JSON.stringify(req === null || req === void 0 ? void 0 : req.url)}`);
    console.log(`HEADERS: ${JSON.stringify(req === null || req === void 0 ? void 0 : req.header("content-type"))}`);
    console.log(`QUERY: ${JSON.stringify(req === null || req === void 0 ? void 0 : req.query)}`);
    console.log("******** REQUEST INFO END*********");
    next();
};
app.use(printRequestInfo);
app.get("/", (req, res) => {
    res.json({ status: "Success!" });
});
app.use("/api/fishbowl", routers_1.FishBowlRouter);
app.use("/api/webhook", routers_1.BigCommerceRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running on http://localhost:${port}`);
});
