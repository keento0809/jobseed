import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Testing = () => {
  const [cookies] = useCookies();
  const [file, setFile] = useState<File | null>();
  const [avatarPath, setAvatarPath] = useState("");
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const seeker_id = cookies.SEEKER_ID;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Create form data
    const formData = new FormData();
    formData.append("image", file!);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // send avatar to image to AWS S3
    const result = await axios.post(
      `${process.env.REACT_APP_PORT}/seekers/avatar/${seeker_id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer" + " " + cookies.JWT_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (result) {
      setIsAvatarChanged(!isAvatarChanged);
      setFile(null);
    }
  };

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const fetchImageFromS3 = async () => {
    !isLoading && setIsLoading(true);
    const seekerAvatarData = await axios.get(
      `${process.env.REACT_APP_PORT}/seekers/avatar/${seeker_id}`,
      {
        headers: {
          Authorization: "Bearer" + " " + cookies.JWT_TOKEN,
        },
      }
    );
    const seekerAvatarUrl = seekerAvatarData.data.avatarUrl;
    setAvatarPath(seekerAvatarUrl);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchImageFromS3();
  }, [isAvatarChanged]);
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
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <img
              src={avatarPath && avatarPath}
              alt="avatar"
              width={200}
              height={200}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Testing;
