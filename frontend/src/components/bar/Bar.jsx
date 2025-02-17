import React, { useEffect, useState } from 'react';
import { fetchBeersAvailableForOneBar } from '../../api/beer/beersAvailableInBar';
import { fetchAllBeers } from '../../api/beer/beerCrud';
import { fetchAllBeerTypes } from '../../api/beerType/beerTypeCrud';
import { translatedOpeningHours } from '../../services/translateOpeningHours';

const Bar = ({ bar }) => {
    const [beersAvailableId, setBeersAvailableId] = useState([]);
    const [beers, setBeers] = useState([]);
    const [beerTypes, setBeerTypes] = useState([]);

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchBeers = async () => {
            await fetchBeersAvailableForOneBar(bar.id)
                .then(beersAvailable => {
                    setBeersAvailableId(beersAvailable);
                })
                .catch(error => console.error(error));

            await fetchAllBeers()
                .then(beers => setBeers(beers))
                .catch(error => console.error(error));

            await fetchAllBeerTypes()
                .then(beerTypes => setBeerTypes(beerTypes))
                .catch(error => console.error(error));
        }

        fetchBeers();
    }, []);

    const beersAvailable = [];
    beersAvailableId.forEach(beer => {
        const beerName = beers.find(b => b.id === beer.beer_id)?.name;
        const beerId = beers.find(b => b.id === beer.beer_id)?.id;
        const beerTypeId = beers.find(b => b.id === beer.beer_id)?.beer_type_id;
        const beerType = beerTypes.find(bt => bt.id === beerTypeId)?.name;
        beersAvailable.push({ beerName, beerId, beerType });
    });

    let translatedHours = [];

    if (bar?.opening_hours) {
        translatedHours = translatedOpeningHours(bar.opening_hours);
        console.log('openingHours after function', translatedHours);
    }


    return (
        <div className="bar-card flex flex-col md:flex-row lg:flex-row justify-between items-center shadow-md rounded-lg m-2 w-[95%] bg-dark-black border-1 border-primary light-mode:bg-light">
            <div className="bar-card-image-container rounded-t-md w-full md:rounded-l-lg md:rounded-tr-none lg:rounded-tr-none lg:rounded-l-lg md:w-1/3 lg:w-1/3 h-40">
                <img src={`${BASE_URL}${bar.bar_picture}`} alt={bar.name} className="shadow-lg bar-card-image w-full h-full object-cover  md:rounded-tr-none lg:rounded-tr-none rounded-t-md md:rounded-l-lg lg:rounded-l-lg" />
            </div>
            <div className="container-infos flex flex-col justify-center items-center rounded-r-lg backdrop-blur-sm text-light light-mode:text-dark-black w-full md-w-2/3 lg:w-2/3 p-2">
                <h3 className="bar-card-title text-center font-title font-bold text-xl p-2">{bar.name}</h3>
                <p className="bar-card-address text-center font-text text-xs">{bar.address}</p>
                <div className="container-hours flex flex-nowrap overflow-x-scroll w-full justify-start items-center gap-1 flex-col md:flex-row lg:flex-row">
                    { translatedHours && translatedHours.map(day => (
                        <div key={day.day} className="bar-card-hours flex justify-center items-center gap-1 min-w-40 border-primary border-1 rounded-md p-1">
                            <p className="bar-card-day font-text text-xs font-bold">{day.day}</p>
                            <ul className="bar-card-hours-list flex gap-1">
                                {day.hours.map(hour => (
                                    <li key={hour} className="bar-card-hour font-text text-xs">{hour}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="container-beers w-full flex-col justify-center items-center gap-1 mt-1">
                    <p className="bar-card-beers-title text-center font-text font-bold text-sm">Bières disponibles :</p>
                    <ul className="bar-card-beers-list flex justify-center items-start gap-1 flex-wrap">
                        {beersAvailable.map(beer => (
                            <li key={beer.beerId} className="bar-card-beer font-text text-center text-sm rounded-full pr-3 pl-3 p-1 bg-primary text-light cursor-pointer">{`${beer.beerName} (${beer.beerType})`}</li>
                        ))}
                    </ul>
                </div>
                <div className="container-rate flex justify-end items-center w-full">
                    <p className="bar-card-rate text-left font-text text-sm">{bar.rate}</p>
                </div>
            </div>
        </div>
    );
};

export default Bar;