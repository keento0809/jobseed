import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import companyRoutes from "./routes/companyRoutes";
import seekerRoutes from "./routes/seekerRoutes";
import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import multer from "multer";
// import
dotenv.config();

const app: Express = express();
const port = 8080;
const storage = multer.memoryStorage();
const upload = multer({ storage });
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/seekers", seekerRoutes);
app.use("/companies", companyRoutes);
app.use("/schedules", scheduleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript server");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

app.listen(port, () => {
  console.log(`[server] server is listening on port ${port}`);
});
