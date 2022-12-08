import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Testing = () => {
  const [cookies] = useCookies();
  const [file, setFile] = useState<File>();
  const [avatarPath, setAvatarPath] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create form data
    const formData = new FormData();
    formData.append("image", file!);
    const seeker_id = cookies.seeker_id;
    // send avatar to image to AWS S3
    await axios.post(
      `http://localhost:8080/seekers/avatar/${seeker_id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer" + " " + cookies.JWT_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };
  const fetchImageFromS3 = async () => {
    const seeker_id = cookies.seeker_id;
    const seekerAvatarData = await axios.get(
      `http://localhost:8080/seekers/avatar/${seeker_id}`,
      {
        headers: {
          Authorization: "Bearer" + " " + cookies.JWT_TOKEN,
        },
      }
    );
    const seekerAvatarUrl = seekerAvatarData.data.avatarUrl;
    setAvatarPath(seekerAvatarUrl);
  };
  useEffect(() => {
    fetchImageFromS3();
  }, []);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ padding: "4rem 0" }}>
          <h2 style={{ paddingBottom: "2rem" }}>
            Testing the upload to AWS S3
          </h2>
          <input onChange={fileSelected} type="file" accept="image/*"></input>
          <button
            type="submit"
            style={{ padding: "0.5rem 1.5rem", border: "1px solid #000" }}
          >
            Submit
          </button>
        </form>
        {/* displaying  */}
        <div className="">
          <img
            src={avatarPath && avatarPath}
            alt="avatar"
            width={200}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default Testing;
