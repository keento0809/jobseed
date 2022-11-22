import React, {useEffect, useState} from 'react';
import {LoadScript, GoogleMap, Marker} from "@react-google-maps/api";
import {useCompanyContext} from "../../components/context/companyContext";
import {Location} from "../../types/Company";

const CompanyMap = () => {

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 49.246292, lng: -123.116226
    }

    const { companies } = useCompanyContext();
    const [ markers, setMakers ] = useState< Array<Location> | undefined>([defaultCenter])

    useEffect(() => {
        companies?.map(company => {
            setMakers([...markers!, company.location])
        })
    }, [companies])

    return (
        <div className="wrapper relative my-6 z-5" style={{ height: '80vh', width: '100%'}}>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_APIKEY!}
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                >
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

CompanyMap.defaltProps = {}

export default CompanyMap;
