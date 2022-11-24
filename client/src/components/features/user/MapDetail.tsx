import React, {useState} from 'react';
import {Company, Location} from "../../../types/Company";
import axios from "axios";

type Props = {
    company: Company
}

const MapDetail =  ({company}: Props) => {
    const [address, setAddress] = useState<string | null>(null)
    const getAddress = async (location : Location) => {
        try {
            let res = await axios.get(`https://maps.google.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&sensor=false&key=${process.env.REACT_APP_GOOGLE_MAP_APIKEY!}`)
            setAddress(res.data.results[0].formatted_address)
        } catch (e: any) {
            console.log(e.message)
        }
    }
    getAddress(company.location)
    return (
        <div className="py-4 font-thin">
            <h3 className="text-xl">Company name: {company.name}</h3>
            <p>Position: {company.jobTitle}</p>
            <p>{address}</p>
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${address}`}
                target="_blank"
            >View on Google map
            </a>
        </div>
    );
};

export default MapDetail;