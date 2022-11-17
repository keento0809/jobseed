import React from 'react';
import {LoadScript, GoogleMap} from "@react-google-maps/api";

const CompanyMap = () => {

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 49.246292, lng: -123.116226
    }

    return (
        <div className="wrapper my-6" style={{ height: '80vh', width: '100%', zIndex:-100 }}>
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
