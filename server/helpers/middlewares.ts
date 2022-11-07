import { Request, Response, NextFunction } from "express";

interface Func {
  (req: Request, res: Response, next: NextFunction): Promise<unknown>;
}

export const catchAsync = (func: Func) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};
