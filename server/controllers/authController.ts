import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import bcrypt from "bcrypt";
import pool from "../db/postgres";

const saltRound = 10;

export const loginSeeker = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) next(new Error("Invalid inputs"));
    const seekers = await pool.query(`SELECT * FROM seeker`);
    res.json({ seekers });
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
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newSeeker = await pool.query(
      `INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, hashedPassword]
    );
    console.log(newSeeker);
    res.json(newSeeker);
    next();
  }
);
