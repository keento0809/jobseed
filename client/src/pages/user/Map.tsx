import React from 'react';
import { GoogleMap, Marker} from "@react-google-maps/api";
import {useJsApiLoader} from "@react-google-maps/api";
import {useCompanyContext} from "../../components/context/companyContext";

const CompanyMap = () => {
    /**
     * TODO: Loading Page / 404 Page
     *
     */
    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 49.246292, lng: -123.116226
    }
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY!
    })

    const {companies} = useCompanyContext();

    const renderMap = () => (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
        >
            {
                companies?.map(company => <Marker key={company.company_id} position={company.location}/>)
            }
        </GoogleMap>)

    return (
        <div className="wrapper relative my-6 z-5" style={{height: '80vh', width: '100%'}}>
            {isLoaded ? renderMap() : <h1>Loading...</h1>}
        </div>
    );
};

export default CompanyMap;
