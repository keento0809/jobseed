import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";

export const getAllCompanies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid params"));
    res.status(200).json({ msg: "succeeded to get companies" });
    next();
  }
);

export const createNewCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      link,
      jobType,
      company_size,
      salary,
      location,
      description,
      status,
      interest,
    } = req.body;
    if (
      !name ||
      !link ||
      !jobType ||
      !company_size ||
      !salary ||
      !description ||
      !status ||
      !interest
    )
      next(new Error("Invalid values"));

    next();
  }
);
