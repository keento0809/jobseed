import React, { useEffect, useState } from "react";
import useFileHooks from "../../../hooks/useFileHooks";
import axios from "axios";
import { SEEKER_ACTION } from "../../context/reducer/SeekerReducer";
import photo from "../../../images/image.jpg";
import Button_sm from "../../models/Button_sm";
import { useAuthContext } from "../../context/AuthContext";

type fileModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  avatarPath: string;
  setAvatarPath: React.Dispatch<React.SetStateAction<string>>;
};

const FileSetModal = ({
  setModal,
  isLoading,
  setIsLoading,
  setAvatarPath,
  avatarPath,
}: fileModalProps) => {
  const { seekerState, seekerDispatch } = useAuthContext();
  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();

  const { handleFiles, imageContainerRef } = useFileHooks();

  const handleAvatarSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file!);
    try {
      seekerDispatch({ type: SEEKER_ACTION.SEEKER_FETCHING, payload: {} });
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_PORT}/seekers/avatar/${seekerState.seeker.seeker_id}`,
        data: formData,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        setIsAvatarChanged(!isAvatarChanged);
        setFile(null);
      }
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_UPDATE_SEEKER,
        payload: res.data.updatingSeeker,
      });

      const seekerAvatarData = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/seekers/avatar/${seekerState.seeker.seeker_id}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
      });
      const seekerAvatarUrl = seekerAvatarData.data.avatarUrl;
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_GET_AVATAR,
        payload: seekerAvatarUrl,
      });
      setAvatarPath(seekerAvatarUrl);
      setIsLoading(false);
      setModal(false);
    } catch (e: any) {
      seekerDispatch({
        type: SEEKER_ACTION.FAILED_UPDATE_SEEKER,
        payload: {},
        error: e,
      });
    }
  };

  const selectedFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile(file);
    handleFiles(e);
    setIsAvatarChanged(!isAvatarChanged);
  };

  return (
    <div className="bg-modal relative z-[1001]">
      <div className="file-modal-container wrapper py-6">
        <div className="pt-12">
          {file ? (
            <div className="w-[70%] m-auto" ref={imageContainerRef}></div>
          ) : (
            <div className="w-full flex justify-center">
              <img className="block opacity-50 w-4/5" src={photo} alt="" />
            </div>
          )}
          <div className="w-full flex justify-center">
            <div className="mt-8">
              <label htmlFor="file" className="mr-12 cursor-pointer">
                Change avatar
                <input
                  className="hidden"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={selectedFileHandler}
                />
              </label>
              <Button_sm
                title={"Cancel"}
                color={"bg-content-blue"}
                bg_color={"bg-white"}
                width={"w-24"}
                onClick={() => {
                  setModal(false);
                }}
                className={"border-2"}
              />
            </div>
          </div>
        </div>
        {file ? (
          <Button_sm
            title={"Save"}
            color={"text-white"}
            bg_color={"bg-content-blue"}
            width={"w-24"}
            onClick={handleAvatarSubmit}
            className={"border-2 block mx-auto mt-8"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FileSetModal;
