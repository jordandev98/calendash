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

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://calendash.com'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/calendar", calendarController);

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
