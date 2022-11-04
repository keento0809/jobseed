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
    const { email, password } = req.body;
    if (!email || !password) next(new Error("Invalid inputs"));
    const loggingSeeker = await pool.query(
      `SELECT * FROM seeker WHERE email = $1`,
      [email]
    );
    if (!loggingSeeker) next(new Error("Seeker not found."));
    const hashedPassword = loggingSeeker.rows[0].password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);
    if (!checkPassword) next(new Error("Password is not correct."));
    // create token
    const token = await createToken(loggingSeeker.rows[0].seeker_id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ msg: "good login", token });
    next();
  }
);

export const signupSeeker = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirmation } = req.body;
    if (!name || !email || !password || !passwordConfirmation)
      next(new Error("Invalid inputs"));
    if (password !== passwordConfirmation)
      next(new Error("password are not correct"));
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newSeeker = await pool.query(
      `INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, hashedPassword]
    );
    // create token
    const token = await createToken(newSeeker.rows[0].seeker_id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ msg: "good signup", token });
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
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) next(new Error("No token found."));
    try {
      const jwtData = jwt.verify(token!, JWT_SECRET_KEY);
      console.log(jwtData);
      if (!jwtData) next(new Error("Invalid token"));
      return next();
    } catch {
      return next(new Error("Invalid token"));
    }
  }
);
