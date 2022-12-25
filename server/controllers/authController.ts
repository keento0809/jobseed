import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import bcrypt from "bcrypt";
import pool from "../db/postgres";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY: string = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN!;

const createToken = (_id: number) => {
  return jwt.sign({ _id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};

export const loginSeeker = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password) next(new Error("Invalid inputs"));
    const loginSeeker = await pool.query(
      `SELECT * FROM seeker WHERE email = $1`,
      [email]
    );
    if (!loginSeeker) next(new Error("Seeker not found."));
    const hashedPassword = loginSeeker.rows[0].password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);
    if (!checkPassword) next(new Error("Password is not correct."));
    // create token
    const token = await createToken(loginSeeker.rows[0].seeker_id);
    // retrieve seeker info form db
    const loginSeekerName = loginSeeker.rows[0].name;
    const loginSeekerEmail = loginSeeker.rows[0].email;
    const loginSeekerPassword = loginSeeker.rows[0].password;
    const loginSeekerInfo = await pool.query(
      "SELECT * FROM seeker WHERE seeker.name = $1 AND seeker.email = $2 AND seeker.password = $3",
      [loginSeekerName, loginSeekerEmail, loginSeekerPassword]
    );
    if (!loginSeekerInfo) next(new Error("No seeker found"));
    const seeker = loginSeekerInfo.rows[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ msg: "good login", token, seeker });
    next();
  }
);

export const signupSeeker = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      password,
      passwordConfirmation,
    }: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    } = req.body;
    if (!name || !email || !password || !passwordConfirmation)
      next(new Error("Invalid inputs"));
    if (password !== passwordConfirmation)
      next(new Error("password are not correct"));
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newSeekerData = await pool.query(
      `INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, hashedPassword]
    );
    if (!newSeekerData) next(new Error("Failed to register new seeker"));
    // create token
    const token = createToken(newSeekerData.rows[0].seeker_id);
    const seeker = newSeekerData.rows[0];
    res.status(200).json({ msg: "good signup", token, seeker });
    next();
  }
);

export const logoutSeeker = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) return res.sendStatus(403);
    res.clearCookie("access_token").status(200).json({ msg: "good logout" });
    next();
  }
);

export const authorization = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization?.startsWith("Bearer")
    )
      next(new Error("You're not authorized."));
    const token: string = req.headers.authorization?.split(" ")[1]!;
    if (!token) next(new Error("No token found."));
    try {
      const jwtData = jwt.verify(token, JWT_SECRET_KEY);
      if (!jwtData) next(new Error("Invalid token"));
      return next();
    } catch (err) {
      console.log(err);
      return next(new Error("Invalid token"));
    }
  }
);

export const testHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    res.json({ msg: "test is successfully done." });
    next();
  }
);
