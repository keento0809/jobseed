import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";

export const getAllCompanies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid seeker"));
    const companiesData = await pool.query(
      "SELECT * FROM company JOIN schedule ON company.company_id = schedule.company_id JOIN seeker ON schedule.seeker_id = seeker.seeker_id WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!companiesData) next(new Error("No company found"));
    const companies = companiesData.rows;
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
  }
);

export const getCompaniesWithStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.params;
    if (
      !status ||
      (status !== "Interested" &&
        status !== "Applied" &&
        status !== "Interview" &&
        status !== "Rejected")
    )
      return next(new Error("Invalid request"));
    const companiesWithStatusInfo = await pool.query(
      "SELECT * FROM company WHERE company.status = $1",
      [status]
    );
    if (!companiesWithStatusInfo) next(new Error("No companies found"));
    const companiesWithStatus = companiesWithStatusInfo.rows;
    res.status(200).json({ companiesWithStatus });
    next();
  }
);

export const createNewCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, link, jobtype, salary, location, description, interest } =
      req.body;
    if (!name || !jobtype) next(new Error("Invalid input values"));
    const newCompany = await pool.query(
      "INSERT INTO company (name,link,jobtype,salary,location,description,status,interest) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        "Interested",
        interest,
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
      location,
      description,
      salary,
      status,
      interest,
    } = req.body;
    const updatingCompany = await pool.query(
      "UPDATE company SET name = $1,link = $2,jobtype = $3,salary = $4,location = $5,description = $6,interest = $7,status = $8 WHERE company.company_id = $9 RETURNING *",
      [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        interest,
        status,
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
    const { company_id } = req.params;
    if (!company_id) next(new Error("Invalid request"));
    const deletingCompany = await pool.query(
      "SELECT * FROM company WHERE company.company_id = $1",
      [company_id]
    );
    if (!deletingCompany) next(new Error("Company not found"));
    await pool.query("DELETE FROM company WHERE company.company_id = $1", [
      company_id,
    ]);
    res.status(200).json({ msg: "company deleted", deletingCompany });
    next();
  }
);
