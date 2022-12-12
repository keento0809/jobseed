import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {Company, Location} from "../../../types/Company";

type locationProps = {
    location: Location;
    companyData: Company;
    setLocation: Dispatch<SetStateAction<Location>>;
    setCompanyData: React.Dispatch<React.SetStateAction<Company>>;
}

const GooglePlace = ({location, companyData, setLocation, setCompanyData}: locationProps) => {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 300,
    });


    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    const handleSelect =
        ({description}: { description: string }) =>
            () => {
                setValue(description, false);
                clearSuggestions();
                getGeocode({address: description}).then((results) => {
                    const {lat, lng} = getLatLng(results[0]);
                    setLocation({lat: Number(lat),lng: Number(lng)})
                    setCompanyData({...companyData, location: {lat: Number(lat),lng: Number(lng)}});
                });
            };
    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: {main_text, secondary_text},
            } = suggestion;

            return (
                <li
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                    className="py-2 px-3"
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref} className="">
            <label className="block text-gray-700 text-sm font-medium mb-2 relative" htmlFor="location">
                location
                <input
                    className=" font-thin shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight block focus:outline-none focus:shadow-outline"
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="location"
                    name="location"
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="font-thin absolute top-[-10] bg-sky-50">{renderSuggestions()}</ul>}
            </label>
        </div>
    );
};

export default GooglePlace;