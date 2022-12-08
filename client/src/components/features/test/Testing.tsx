import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Testing = () => {
  // Front-end side
  const [cookies, setCookie, removeCookie] = useCookies();
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create form data
    const formData = new FormData();
    formData.append("image", file!);
    // temporary
    const seeker_id = cookies.seeker_id;
    await axios.post(
      `http://localhost:8080/seekers/avatar/${seeker_id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer" + cookies.JWT_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    navigate("/");
  };
  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };
  console.log(file);
  return (
    <>
      <form onSubmit={handleSubmit} style={{ padding: "10rem 0" }}>
        <h2 style={{ paddingBottom: "2rem" }}>Testing the upload to AWS S3</h2>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button
          type="submit"
          style={{ padding: "0.5rem 1.5rem", border: "1px solid #000" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Testing;
