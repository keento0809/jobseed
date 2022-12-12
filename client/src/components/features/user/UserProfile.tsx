import React, {ChangeEvent, useState} from 'react';
import {BiEditAlt} from "react-icons/bi"
import InputField from "../../models/InputField";
import {Seeker} from "../../../types/Seeker";
import {useSeekerContext} from "../../context/seekerContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {SEEKER_ACTION} from "../../context/reducer/SeekerReducer";


type User = {
    name: string;
    avatar: string;
    email: string;
}

const UserProfile = (props: User) => {
    const {seekerState, seekerDispatch} = useAuthContext();
    const [wannaEdit, setWannaEdit] = useState<boolean>(false);
    const [editSeeker, setEditSeeker] = useState<Seeker>({
        name:props.name,
        email: props.email
    })
    const navigate = useNavigate();

    const updateUserInfoHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            seekerDispatch({type: SEEKER_ACTION.SEEKER_FETCHING, payload:{}})
            let res = await axios({
                method: "patch",
                url: `http://localhost:8080/seekers/${seekerState.seeker.seeker_id}`,
                data: editSeeker,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${seekerState.token}`
                }
            })
            if (res.status === 200) {
                console.log(res.data)
                seekerDispatch({type: SEEKER_ACTION.SUCCESS_UPDATE_SEEKER, payload: res.data.updatingSeeker})
            }
        } catch (e: any) {
            console.log(e.message)
        }
        setWannaEdit(false)
        navigate("/user", { replace: true });
    }

    return (
        <div className="user-profile my-4 flex lg:flex-col lg:col-span-1 ">
            <img src={props.avatar} alt="" className="w-24 lg:w-52 rounded-full object-cover"/>
            {wannaEdit ?
                <div className="w-full">
                    < InputField
                        type={"name"}
                        title={""}
                        name={"name"}
                        value={editSeeker.name}
                        onChange={(e) => {setEditSeeker({...editSeeker, [e.target.name]: e.target.value})}}
                    />
                    < InputField
                        type={"email"}
                        title={""}
                        name={"email"}
                        value={editSeeker.email}
                        onChange={(e) => {setEditSeeker({...editSeeker, [e.target.name]: e.target.value})}}
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
                                setWannaEdit(false)
                            }}
                            className="cursor-pointer w-full flex justify-center bg-slate-200 rounded-sm py-1"
                        >
                            <p className="text-sm">Cancel</p>
                        </div>
                    </div>
                </div> :
                <div className="w-full py-4">
                    <h3 className="font-bold text-md">{seekerState.seeker.name}</h3>
                    <p className="text-sm">{seekerState.seeker.email}</p>
                    <div
                        onClick={() => {
                            setWannaEdit(true)
                        }}
                        className="mt-2 md:mt-4 justify-center py-2 border rounded-md bg-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <BiEditAlt/>
                        <span className="text-sm">Edit Profile</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserProfile;
