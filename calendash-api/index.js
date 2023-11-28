import express, * as bodyParser from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import calendarController from "./controllers/CalendarController.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));

app.use("/api/v1/calendar", calendarController);

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));