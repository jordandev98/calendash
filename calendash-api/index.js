import express, * as bodyParser from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import calendarController from "./controllers/CalendarController.js";
import mongoose from "mongoose";
import userController from "./controllers/UserController.js";
import eventController from "./controllers/EventController.js";
import authController from "./controllers/AuthController.js";
import appointmentController from "./controllers/AppointmentController.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'https://calendash.com'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors());

app.use("/api/v1/calendar", calendarController);
app.use("/api/v1/user", userController);
app.use("/api/v1/event", eventController);
app.use("/api/v1/auth", authController);
app.use("/api/v1/appointment", appointmentController);

const PORT = process.env.PORT || 9000

mongoose.connect(
    process.env.MONGO_URL, {}
).then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
