import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";
import { Company } from "../types/Company";

export const getAllCompanies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid seeker"));
    const companiesData = await pool.query(
      "SELECT * FROM company WHERE company.seeker_id = $1",
      [seeker_id]
    );
    if (!companiesData) next(new Error("No company found"));
    const companies: Company[] = companiesData.rows;
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
  }
);

export const getCompaniesWithStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, seeker_id } = req.params;
    if (
      !status ||
      (status !== "Interested" &&
        status !== "Applied" &&
        status !== "Interview" &&
        status !== "Rejected")
    )
      return next(new Error("Invalid request"));
    const companiesWithStatusInfo = await pool.query(
      "SELECT * FROM company WHERE company.status = $1 AND company.seeker_id = $2",
      [status, seeker_id]
    );

    if (!companiesWithStatusInfo) next(new Error("No companies found"));
    const companiesWithStatus: Company[] = companiesWithStatusInfo.rows;
    res.status(200).json({ companiesWithStatus });
    next();
  }
);

export const createNewCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      link,
      jobtype,
      salary,
      location,
      description,
      interest,
      seeker_id,
      company_size,
    }: Company = req.body;
    if (!name || !jobtype) next(new Error("Invalid input values"));
    const newCompany = await pool.query(
      "INSERT INTO company (name,link,jobtype,salary,location,description,status,interest,seeker_id,company_size) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        "Interested",
        interest,
        seeker_id,
        company_size,
      ]
    );
    if (!newCompany) next(new Error("Failed to create company"));
    res.status(200).json({ newCompany });
    next();
  }
);

export const updateCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { company_id } = req.params;
    if (!company_id) next(new Error("Invalid request"));
    const {
      name,
      link,
      jobtype,
      salary,
      location,
      description,
      interest,
      status,
      seeker_id,
      company_size,
    }: Company = req.body;
    const updatingCompany = await pool.query(
      "UPDATE company SET name = $1,link = $2,jobtype = $3,salary = $4,location = $5, description = $6,interest = $7,status = $8,seeker_id = $9,company_size = $10 WHERE company.company_id = $11 AND company.seeker_id = $9 RETURNING *",
      [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        interest,
        status,
        seeker_id,
        company_size,
        company_id,
      ]
    );
    if (!updatingCompany) next(new Error("Failed to update company"));
    res.status(200).json({ updatingCompany });
    next();
  }
);

export const deleteCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { company_id, seeker_id } = req.params;
    if (!company_id) next(new Error("Invalid request"));
    const deletingSchedulesWithCompanyId = await pool.query(
      "DELETE FROM schedule WHERE schedule.company_id = $1 AND schedule.seeker_id = $2",
      [company_id, seeker_id]
    );
    if (!deletingSchedulesWithCompanyId)
      next(new Error("Failed to delete company"));
    const deletingCompany = await pool.query(
      "SELECT * FROM company WHERE company.company_id = $1 AND company.seeker_id = $2",
      [company_id, seeker_id]
    );
    if (!deletingCompany) next(new Error("Failed to delete company"));
    await pool.query(
      "DELETE FROM company WHERE company.company_id = $1 AND company.seeker_id = $2",
      [company_id, seeker_id]
    );
    res.status(200).json({ msg: "company deleted", deletingCompany });
    next();
  }
);
