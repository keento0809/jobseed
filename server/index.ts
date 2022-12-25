import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import companyRoutes from "./routes/companyRoutes";
import seekerRoutes from "./routes/seekerRoutes";
import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
// import
dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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

app.listen(process.env.PORT || 8080, () => {
  console.log(`[server] server is listening on port`);
});
