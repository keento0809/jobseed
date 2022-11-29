import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";

export const getAllCompanies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid seeker"));
    const companies = await pool.query(
      "SELECT * FROM company JOIN schedule ON company.company_id = schedule.company_id JOIN seeker ON schedule.seeker_id = seeker.seeker_id WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!companies) next(new Error("No company found"));
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
  }
);

export const getCompaniesWithStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.params;
    if (
      !status ||
      (status != "Interested" &&
        status != "Applied" &&
        status !== "Interview" &&
        status !== "Rejected")
    )
      next(new Error("Invalid request"));
    const companiesWithStatusInfo = await pool.query(
      "SELECT * FROM company WHERE company.status = $1",
      [status]
    );
    if (!companiesWithStatusInfo) next(new Error("No companies found"));
    const companiesWithStatus = companiesWithStatusInfo.rows;
    res
      .status(200)
      .json({ msg: "good companies with status", companiesWithStatus });
    next();
  }
);

export const createNewCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, link, jobType, salary, location, description } = req.body;
    if (!name || !jobType) next(new Error("Invalid input values"));
    const newCompany = await pool.query(
      "INSERT INTO company (name,link,jobType,salary,location,description,status,interest) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [name, link, jobType, salary, location, description, "Interested"]
    );
    if (!newCompany) next(new Error("Failed to create company"));
    res.status(200).json({ msg: "Company successfully created", newCompany });
    next();
  }
);

export const updateCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { company_id } = req.params;
    if (!company_id) next(new Error("Invalid request"));
    const { companyObj } = req.body;
    const { name, link, location, jobType, description, status, interest } =
      companyObj;
    const updatingCompany = await pool.query(
      "UPDATE company SET name = $1,link = $2,location = $3,jobType = $4,description = $5,status = $6,interest = $7  WHERE company.company_id = $8",
      [name, link, location, jobType, description, status, interest, company_id]
    );
    if (!updatingCompany) next(new Error("No company found"));
    res.status(200).json({ msg: "Company updated" });
    next();
  }
);

export const deleteCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { company_id } = req.body;
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
