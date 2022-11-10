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
    if (!params) next(new Error("Invalid request"));
    const schedulesData = await pool.query(
      "SELECT * FROM schedule JOIN company ON schedule.company_id = company.company_id WHERE company.status = $1",
      [params]
    );
    if (!schedulesData)
      next(new Error(`No schedule with ${params} status found`));
    const schedules = schedulesData.rows;
    res.status(200).json({ msg: "good category", schedules });
    next();
  }
);

export const createSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, date, time, importance, memo, seeker_id, company_id } =
      req.body;
    if (
      !title ||
      !date ||
      !time ||
      !importance ||
      !memo ||
      !seeker_id ||
      !company_id
    )
      next(new Error("Invalid input data"));
    const newSchedule = await pool.query(
      "INSERT INTO schedule (title,date,importance,memo,seeker_id,company_id,time) VALUES ($1,$2,$3,$4,$5,$6)",
      [title, date, importance, memo, seeker_id, company_id, time]
    );
    if (!newSchedule) next(new Error("Failed to create schedule"));
    res.status(200).json({ msg: "created schedule" });
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
