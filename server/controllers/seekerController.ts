import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";
import multer from "multer";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../s3";

export const getSeekerInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid request"));
    const seekerInfo = await pool.query(
      "SELECT * FROM seeker WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!seekerInfo) next(new Error("No seeker found"));
    const seeker = seekerInfo.rows[0];
    res.status(200).json({ msg: "Good seeker", seeker });
    next();
  }
);

export const updateSeekerInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid request"));
    const { name, email } = req.body;
    if (!name || !email) next(new Error("Invalid inputs"));
    const updatingSeeker = await pool.query(
      "UPDATE seeker SET name = $1, email = $2 WHERE seeker.seeker_id = $3 RETURNING *",
      [name, email, seeker_id]
    );
    if (!updatingSeeker) next(new Error("Failed to update seeker"));
    res.status(200).json({ msg: "Good seeker update", updatingSeeker });
    next();
  }
);

export const addAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    const file = req.file;
    const caption = req.body.caption;
    if (!file || !caption) next(new Error("No avatar attached"));
    // Need to add functions sending avatar to S3
    const fileBuffer = sharp(file?.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    const result = await uploadFile(fileBuffer, caption, file?.mimetype);
    // add data to DB
    const updatingSeekerData = await pool.query(
      "UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *",
      [caption, seeker_id]
    );
    const updatingSeeker = updatingSeekerData.rows[0];
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
    const caption = req.body.caption;
    if (!file || !caption) next(new Error("No avatar attached"));
    const updatingSeekerData = await pool.query(
      "UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *",
      [caption, seeker_id]
    );
    const updatingSeeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "good updating avatar", updatingSeeker });
    next();
  }
);

// Front side

// const [file, setFile] = useState();
// const [caption, setCaption] = useState("");

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   // Create form data
//   const formData = new FormData();
//   formData.append("image", file);
//   formData.append("caption", caption);
//   await axios.post("http://localhost:8080/seekers/avatar/:seeker_id", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   navigate("/")
// };

// const fileSelected = (event) => {
//   const file = event.target.files[0];
//   setFile(file);
// };

// <form onSubmit={handleSubmit}>
//    <input onChange={fileSelected} type="file" accept="image/*"></input>
//    <input
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           type="text"
//           placeholder="Caption"
//         ></input>
//         <button type="submit">Submit</button>
// </form>
