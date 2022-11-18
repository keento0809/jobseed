"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const seekerRoutes_1 = __importDefault(require("./routes/seekerRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const calendarRoutes_1 = __importDefault(require("./routes/calendarRoutes"));
const scheduleRoutes_1 = __importDefault(require("./routes/scheduleRoutes"));
// import
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
// middleware
app.use((0, cors_1.default)(corsOptions));
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/auth", authRoutes_1.default);
app.use("/seekers", seekerRoutes_1.default);
app.use("/companies", companyRoutes_1.default);
app.use("/calenders", calendarRoutes_1.default);
app.use("/schedules", scheduleRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Express + Typescript server");
});
app.all("*", (req, res, next) => {
    next();
});
app.listen(port, () => {
    console.log(`[server] server is listening on port ${port}`);
});
