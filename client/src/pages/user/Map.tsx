import React, {useState} from 'react';
import {GoogleMap, Marker} from "@react-google-maps/api";
import {useJsApiLoader} from "@react-google-maps/api";
import {useCompanyContext} from "../../components/context/companyContext";
import {Company} from "../../types/Company";
import MapDetail from "../../components/features/user/MapDetail";
import {useCompaniesContext} from "../../components/context/companiesContext";

const CompanyMap = () => {
    const {companyState} = useCompaniesContext();
    const {companies} = companyState

    const [selectedMap, setSelectedMap] = useState<Company | null>(null);

    const selectedNull = (
        <div className="flex h-[20%] justify-center items-center">
            <h1>Please Select Marker</h1>
        </div>
    )

    const mapStyles = {
        height: "80%",
        width: "100%"
    };
    const defaultCenter = {
        lat: 49.246292, lng: -123.116226
    }

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY!
    })

    const renderMap = () => (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
        >
            {
                companies?.map(company =>
                    <div key={company.company_id}>
                        <Marker
                            position={{lat: company.location.lat, lng: company.location.lng}}
                            onClick={() => setSelectedMap(company)}
                            title={company.name}
                        />
                    </div>
                )
            }
        </GoogleMap>)

    return (
        <div className="wrapper relative my-6 z-5 " style={{height: '80vh', width: '100%'}}>
            {isLoaded ? renderMap() : <h1>Loading...</h1>}
            {selectedMap === null ? selectedNull : <MapDetail company={selectedMap}/>}
        </div>
    );
};

export default CompanyMap;
