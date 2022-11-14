import React, {useState} from 'react';
import {BiEditAlt} from "react-icons/bi"
import InputField from "../../models/InputField";

type User = {
    name: string;
    avatar: string;
    email: string;
}

/**
 * TODO: Create edit profile
 *
 */
const UserProfile = (props: User) => {

    const [wannaEdit, setWannaEdit] = useState<boolean>(false)

    return (
        <div className="user-profile my-4 flex lg:flex-col lg:col-span-1 ">
            <img src={props.avatar} alt="" className="w-24 lg:w-52 rounded-full object-cover"/>

            {wannaEdit ?
                <div className="w-full">
                    < InputField type={"name"} title={""} name={"name"} value={"name"}/>
                    < InputField type={"email"} title={""} name={"email"} value={"email"}/>
                    <div className="flex justify-center w-full gap-2 mt-4">
                        <div
                            onClick={() => {
                                setWannaEdit(false)
                            }}
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
                    <h3 className="font-bold text-md">{props.name}</h3>
                    <p className="text-sm">{props.email}</p>
                    <div
                        onClick={() => {
                            setWannaEdit(true)
                        }}
                        className="mt-2 md:mt-4 justify-center py-2 border rounded-md bg-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <BiEditAlt/>
                        <span className="text-sm">Edit Profile</span>
                    </div>
                </div>}


        </div>
    );
};

export default UserProfile;
