import { Request, Response, NextFunction } from "express";
import pool from "../db/postgres";
import { catchAsync } from "../helpers/middlewares";

export const getSchedules = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid request"));
    const schedulesData = await pool.query(
      "SELECT * FROM schedule WHERE schedule.seeker_id = $1",
      [seeker_id]
    );
    if (!schedulesData) next(new Error("No schedule found"));
    const schedules = schedulesData.rows;
    res.status(200).json({ msg: "good schedule", schedules });
    next();
  }
);

export const getSchedulesSortedByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    console.log(params);
    if (!params) next(new Error("Invalid request"));
    res.status(200).json({ msg: "good category" });
    next();
  }
);

export const createSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);
export const updateSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);
export const deleteSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);
