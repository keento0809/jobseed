import React from 'react';

type User = {
    name: string;
    avatar: string;
    email: string;

}

const UserProfile = (props: User) => {
    return (
        <div className="user-profile my-4 flex lg:flex-col lg:fixed">
            <img src={props.avatar} alt="" className="w-24 rounded-full"/>
            <div className="w-full py-4">
                <h3 className="font-bold">{props.name}</h3>
                <p>{props.email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
