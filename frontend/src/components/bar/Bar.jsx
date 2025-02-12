import React from 'react';

const Bar = ({bar}) => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="bar-card flex justify-around items-center shadow-md rounded-lg m-2">
            <div className="bar-card-image-container rounded-l-lg w-1/3">
                <img src={`${BASE_URL}${bar.bar_picture}`} alt={bar.name} className="bar-card-image w-full" />
            </div>
            <div className="container-infos flex flex-col justify-center items-center rounded-r-lg backdrop-blur-sm text-light light-mode:text-dark-black">
                <h3 className="bar-card-title text-center font-title font-bold text-xl">{bar.name}</h3>
                <p className="bar-card-address text-center font-text text-sm">{bar.address}</p>
                <p className="bar-card-description text-center font-text text-sm">{bar.opening_hours}</p>
                <div className="container-rate flex justify-end items-center w-full">
                    <p className="bar-card-rate text-left font-text text-sm">{bar.rate}</p>
                </div>
            </div>            
        </div>
    );
};

export default Bar;