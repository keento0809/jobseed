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

export const getOneSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { schedule_id } = req.params;
    if (!schedule_id) next(new Error("Invalid request"));
    const scheduleData = await pool.query(
      "SELECT * FROM schedule WHERE schedule.schedule_id = $1",
      [schedule_id]
    );
    if (!scheduleData) next(new Error("No schedule found"));
    const schedule = scheduleData.rows[0];
    res.status(200).json({ msg: "good schedule", schedule });
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
    const newScheduleData = await pool.query(
      "INSERT INTO schedule (title,date,importance,memo,seeker_id,company_id,time) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, date, importance, memo, seeker_id, company_id, time]
    );
    if (!newScheduleData) next(new Error("Failed to create schedule"));
    const newSchedule = newScheduleData.rows[0];
    res.status(200).json({ msg: "created schedule", newSchedule });
    next();
  }
);

export const updateSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { schedule_id } = req.params;
    const { title, date, importance, memo, seeker_id, company_id, time } =
      req.body;
    if (!schedule_id) next(new Error("Invalid request"));
    const updatingScheduleData = await pool.query(
      "UPDATE schedule SET title = $1,date = $2,importance = $3,memo = $4,seeker_id = $5,company_id = $6,time = $7 WHERE schedule.schedule_id = $8",
      [title, date, importance, memo, seeker_id, company_id, time, schedule_id]
    );
    if (!updatingScheduleData) next(new Error("Failed to update schedule"));
    const updatingSchedule = updatingScheduleData.rows[0];
    res.status(200).json({ msg: "update schedule", updatingSchedule });
    next();
  }
);

export const deleteSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { schedule_id } = req.params;
    if (!schedule_id) next(new Error("Invalid request"));
    const deletingSchedule = await pool.query(
      "DELETE FROM schedule WHERE schedule.schedule_id = $1",
      [schedule_id]
    );
    if (!deletingSchedule) next(new Error("Failed to create schedule"));
    res.status(200).json({ msg: "delete schedule" });
    next();
  }
);
