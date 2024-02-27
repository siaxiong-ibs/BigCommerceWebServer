import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { FishBowlRouter, BigCommerceRouter} from "./routes/routers";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({origin: "https://ibs-implant.mybigcommerce.com"}));

const printRequestInfo = (req : Request,resp : Response, next: NextFunction)=>{
	console.log("******** REQUEST INFO START*********");
	console.log(`METHOD: ${(req.method).toUpperCase()} ${req?.path}`);
	console.log(`BODY: ${JSON.stringify(req?.body)}`);
	console.log(`URL: ${JSON.stringify(req?.url)}`);
	console.log(`HEADERS: ${JSON.stringify(req?.header("content-type"))}`);
	console.log(`QUERY: ${JSON.stringify(req?.query)}`);
	console.log("******** REQUEST INFO END*********");
	next();
};

app.use(printRequestInfo);



app.get("/",(req: Request, res: Response)=>{
    res.json({status: "Success!"})
})

app.use("/api/fishbowl", FishBowlRouter);
app.use("/api/webhook", BigCommerceRouter)

app.listen(port,()=>{
    console.log(`[server]: Server is running on http://localhost:${port}`)
})