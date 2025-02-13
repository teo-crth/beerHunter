import React from 'react';

const Bar = ({bar}) => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="bar-card flex flex-col md:flex-row lg:flex-row justify-between items-center shadow-md rounded-lg m-2 w-[95%] bg-dark-black border-1 border-primary light-mode:bg-light">
            <div className="bar-card-image-container rounded-t-md w-full md:rounded-l-lg md:rounded-tr-none lg:rounded-tr-none lg:rounded-l-lg md:w-1/3 lg:w-1/3 h-40">
                <img src={`${BASE_URL}${bar.bar_picture}`} alt={bar.name} className="shadow-lg bar-card-image w-full h-full object-cover  md:rounded-tr-none lg:rounded-tr-none rounded-t-md md:rounded-l-lg lg:rounded-l-lg" />
            </div>
            <div className="container-infos flex flex-col justify-center items-center rounded-r-lg backdrop-blur-sm text-light light-mode:text-dark-black w-full md-w-2/3 lg:w-2/3 p-2">
                <h3 className="bar-card-title text-center font-title font-bold text-xl p-2">{bar.name}</h3>
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