import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";
import sharp from "sharp";
import { deleteFile, getObjectSignedUrl, uploadFile } from "../s3";
import { Seeker } from "../types/Seeker";

export const getSeekerInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid request"));
    const seekerInfo = await pool.query(
      "SELECT * FROM seeker WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!seekerInfo) next(new Error("No seeker found"));
    const seeker: Seeker = seekerInfo.rows[0];
    res.status(200).json({ msg: "Good seeker", seeker });
    next();
  }
);

export const updateSeekerInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid request"));
    const { name, email }: { name: string; email: string } = req.body;
    if (!name || !email) next(new Error("Invalid inputs"));
    const updatingSeekerData = await pool.query(
      "UPDATE seeker SET name = $1, email = $2 WHERE seeker.seeker_id = $3 RETURNING *",
      [name, email, seeker_id]
    );
    if (!updatingSeekerData) next(new Error("Failed to update seeker"));
    const updatingSeeker: Seeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "Good seeker update", updatingSeeker });
    next();
  }
);

export const addAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    const file = req.file;
    const fileCaption = file?.originalname.split(".")[0];
    console.log("fileha, ", file);
    if (!file) next(new Error("No avatar attached"));
    // fileBuffer
    const fileBuffer = await sharp(file!.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    // add image to s3
    const result = await uploadFile(fileBuffer, fileCaption, file!.mimetype);
    if (!result) next(new Error("Failed to upload file to s3"));
    // add data to DB
    const updatingSeekerData = await pool.query(
      "UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *",
      [fileCaption, seeker_id]
    );
    const updatingSeeker: Seeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "Good new avatar", updatingSeeker });
    next();
  }
);

export const getAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    const seekerData = await pool.query(
      "SELECT * FROM seeker WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!seekerData) next(new Error("No seeker found"));
    const avatarCaption = seekerData.rows[0].avatar;
    const avatarUrl = await getObjectSignedUrl(avatarCaption);
    if (!avatarUrl) next(new Error("No avatar found"));
    res.status(200).json({ msg: "good avatar", avatarUrl });
    next();
  }
);

export const updateAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    const file = req.file;
    const fileCaption = file?.originalname.split(".")[0];
    if (!file) next(new Error("No avatar attached"));
    // delete current avatar
    await deleteAvatar(seeker_id);
    // fileBuffer
    const fileBuffer = await sharp(file!.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    // add image to s3
    const result = await uploadFile(fileBuffer, fileCaption, file!.mimetype);
    if (!result) next(new Error("Failed to upload file to s3"));
    // add data to DB
    const updatingSeekerData = await pool.query(
      "UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *",
      [fileCaption, seeker_id]
    );
    const updatingSeeker: Seeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "good updating avatar", updatingSeeker });
    next();
  }
);

export const deleteAvatar = async (seeker_id: string) => {
  const deletingAvatarData = await pool.query(
    "SELECT avatar FROM seeker WHERE seeker.seeker_id = $1",
    [seeker_id]
  );
  if (!deletingAvatarData.rows[0]) return;
  const deletingAvatar = deletingAvatarData.rows[0];
  // delete avatar in S3 bucket
  const resultForDeleting = await deleteFile(deletingAvatar);
  if (!resultForDeleting) throw new Error("Failed to delete avatar");
  return resultForDeleting;
};

export const updateSeekerLocation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    const { location } = req.body;
    const currSeekerData = await pool.query(
      "SELECT * FROM seeker WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!currSeekerData) next(new Error("No seeker found"));
    const currSeeker = currSeekerData.rows[0];
    const result = await pool.query(
      "UPDATE seeker SET seeker.location = $1 WHERE seeker.seeker_id = $2",
      [location, currSeeker.seeker_id]
    );
    if (!result) next(new Error("Failed to update seeker location"));
    res.status(200).json({ msg: "good seeker location", result, location });
    next();
  }
);
