import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";

export const updateSeekerInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    if (!name || !email) next(new Error("Invalid inputs"));
    const updatingSeeker = await pool.query(
      "UPDATE seeker SET name = $1, email = $2 RETURNING *",
      [name, email]
    );
    if (!updatingSeeker) next(new Error("Failed to update seeker"));
    res.status(200).json({ msg: "Good seeker update", updatingSeeker });
    next();
  }
);

export const addAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;
    if (!avatar) next(new Error("No avatar attached"));
    // Need to add functions sending avatar to S3
    res.status(200).json({ msg: "Good avatar" });
    next();
  }
);
