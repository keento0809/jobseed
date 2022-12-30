import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import InputField from "../../models/InputField";
import { Seeker } from "../../../types/Seeker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { SEEKER_ACTION } from "../../context/reducer/SeekerReducer";
import pencil from "../../../images/pencil.png";
import FileSetModal from "./FileSetModal";
import human_icon from "../../../images/human_icon.png";
import { useCookies } from "react-cookie";

type User = {
  name: string;
  avatar: string;
  email: string;
};

const UserProfile = () => {
  const { seekerState, seekerDispatch } = useAuthContext();
  const [wannaEdit, setWannaEdit] = useState<boolean>(false);
  const [editSeeker, setEditSeeker] = useState<Seeker>({
    name: seekerState && seekerState.seeker.name,
    email: seekerState && seekerState.seeker.email,
  });
  const [fileSetModal, setFileSetModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [avatarPath, setAvatarPath] = useState<string>("");
  const avatar = seekerState.seeker.avatar;
  const [cookies, setCookie] = useCookies();

  const uploadButton = (
    <label
      htmlFor="file_upload"
      className="absolute bottom-0 right-0"
      onClick={() => setFileSetModal(true)}
    >
      <img
        src={pencil}
        alt="editAvatar"
        className="opacity-50 w-[25px] hover:cursor-pointer hover:opacity-100"
      />
    </label>
  );

  const updateUserInfoHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      seekerDispatch({ type: SEEKER_ACTION.SEEKER_FETCHING, payload: {} });
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_PORT}/seekers/${seekerState.seeker.seeker_id}`,
        data: editSeeker,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      if (res.status === 200) {
        seekerDispatch({
          type: SEEKER_ACTION.SUCCESS_UPDATE_SEEKER,
          payload: res.data.updatingSeeker,
        });
      }
    } catch (e: any) {
      console.log(e.message);
    }
    setWannaEdit(false);
    navigate("/user", { replace: true });
  };

  const getSeeker = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/seekers/${cookies.SEEKER_ID}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_RELOAD_SEEKER,
        payload: res.data.seeker,
      });
      const seekerAvatarData = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/seekers/avatar/${cookies.SEEKER_ID}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      const avatarUrl = seekerAvatarData.data.avatarUrl;
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_GET_AVATAR,
        payload: avatarUrl,
      });
      setAvatarPath(avatarUrl);
    } catch (e: any) {
      console.log(e);
    }
  };

  const fetchImageFromS3 = async () => {
    try {
      const seekerAvatarData = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/seekers/avatar/${seekerState.seeker.seeker_id}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
      });
      const avatarUrl = seekerAvatarData.data.avatarUrl;
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_GET_AVATAR,
        payload: avatarUrl,
      });
      setAvatarPath(avatarUrl);
      setIsLoading(false);
    } catch (error: any) {
      seekerDispatch({
        type: SEEKER_ACTION.FAILED_UPDATE_SEEKER,
        payload: {},
        error,
      });
    }
  };

  useEffect(() => {
    getSeeker();
  }, []);

  useEffect(() => {
    setEditSeeker({
      name: seekerState.seeker.name,
      email: seekerState.seeker.email,
    });
  }, [seekerState]);

  useEffect(() => {
    if (avatar !== null) {
      fetchImageFromS3();
    }
  }, [isLoading]);

  return (
    <div className="lg:flex-col justify-center lg:mt-8">
      <div className="relative w-[200px] h-[200px] mx-auto my-4">
        <div className="w-[200px] h-[200px] overflow-hidden rounded-full ">
          <img
            src={avatar === null ? human_icon : avatar}
            alt="profile"
            className="w-[200px] h-[200px] object-cover object-center mx-auto scale-130"
          />
          {wannaEdit ? uploadButton : null}
        </div>
      </div>
      {wannaEdit ? (
        <div className="w-full py-4">
          <InputField
            type={"name"}
            title={""}
            name={"name"}
            value={editSeeker.name}
            onChange={(e) => {
              setEditSeeker({ ...editSeeker, [e.target.name]: e.target.value });
            }}
          />
          <InputField
            type={"email"}
            title={""}
            name={"email"}
            value={editSeeker.email}
            onChange={(e) => {
              setEditSeeker({ ...editSeeker, [e.target.name]: e.target.value });
            }}
          />
          <div className="flex justify-center w-full gap-2 mt-4">
            <div
              onClick={updateUserInfoHandler}
              className="cursor-pointer w-full flex justify-center bg-content-blue text-white rounded-sm py-1"
            >
              <p className="text-sm">Save</p>
            </div>
            <div
              onClick={() => {
                setWannaEdit(false);
              }}
              className="cursor-pointer w-full flex justify-center bg-slate-200 rounded-sm py-1"
            >
              <p className="text-sm">Cancel</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full py-4">
          <h3 className="font-bold text-md">{seekerState.seeker.name}</h3>
          <p className="text-sm">{seekerState.seeker.email}</p>
          <div
            onClick={() => {
              setWannaEdit(true);
            }}
            className="mt-2 md:mt-4 justify-center py-2 border rounded-md bg-slate-300 flex items-center gap-2 cursor-pointer"
          >
            <BiEditAlt />
            <span className="text-sm">Edit Profile</span>
          </div>
        </div>
      )}
      {fileSetModal && (
        <FileSetModal
          setModal={setFileSetModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          avatarPath={avatarPath}
          setAvatarPath={setAvatarPath}
        />
      )}
    </div>
  );
};

export default UserProfile;
