import React from 'react';
import {GrLocation} from "react-icons/gr"

type Props = {
    lat: number,
    lng: number,
    onClick: () => void
}

const LocationMarker = ({lat, lng, onClick}: Props) => {
    return (
        <div onClick={onClick}>
            <GrLocation/>
        </div>
    );
};

export default LocationMarker;