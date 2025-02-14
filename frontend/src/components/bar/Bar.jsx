import React, { useEffect, useState } from 'react';
import { fetchBeersAvailableForOneBar } from '../../api/beer/beersAvailableInBar';
import { fetchAllBeers } from '../../api/beer/beerCrud';
import { fetchAllBeerTypes } from '../../api/beerType/beerTypeCrud';

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

    // Translate HOURS in French
    let openingHoursArray = [];

    const translatedOpeningHours = (openingHours) => {

        if (!openingHours) {
            return [];
        }

        openingHoursArray = openingHours.split('M,');

        if (openingHoursArray.length > 0) {
            const updatedOpeningHoursArray = openingHoursArray.map((obj) => {
                if (obj[obj.length - 1] === 'A' || obj[obj.length - 1] === 'P') {
                    return obj + 'M';
                }
                return obj;
            });

            const splitOpeningHours = updatedOpeningHoursArray.map(obj => {
                const parts = obj.split(': ');
                return { day: parts[0], hours: parts[1] };
            });

            // splitOpeningHours.forEach(obj => {

            //     if (obj.hours === 'Closed') {
            //         obj.hours = 'Fermé';
            //     } else {
            //         const hours = obj.hours.split(' - ');
            //         const startHour = hours[0].split(':');
            //         const endHour = hours[1].split(':');
            //         const startHourInt = parseInt(startHour[0]);
            //         const endHourInt = parseInt(endHour[0]);
            //         const startHourConverted = startHourInt > 12 ? `${startHourInt - 12}h${startHour[1]}` : `${startHourInt}h${startHour[1]}`;
            //         const endHourConverted = endHourInt > 12 ? `${endHourInt - 12}h${endHour[1]}` : `${endHourInt}h${endHour[1]}`;
            //         obj.hours = `${startHourConverted} - ${endHourConverted}`;
            //     }

            //     switch (obj.day) {
            //         case 'Monday':
            //             obj.day = 'Lundi';
            //             break;
            //         case 'Tuesday':
            //             obj.day = 'Mardi';
            //             break;
            //         case 'Wednesday':
            //             obj.day = 'Mercredi';
            //             break;
            //         case 'Thursday':
            //             obj.day = 'Jeudi';
            //             break;
            //         case 'Friday':
            //             obj.day = 'Vendredi';
            //             break;
            //         case 'Saturday':
            //             obj.day = 'Samedi';
            //             break;
            //         case 'Sunday':
            //             obj.day = 'Dimanche';
            //             break;
            //         default:
            //             break;
            //     }

            //     return obj;
            // });
    console.log('splitOpeningHours séparé en objet', splitOpeningHours);
    
            splitOpeningHours.forEach(obj => {
                if (obj.hours === 'Closed') {
                    obj.hours = 'Fermé';
                } else if (obj.hours === 'Open 24 hours') {
                    obj.hours = 'Ouvert 24h/24';
                } else {
                    const hours = obj.hours.split(' – ');

                    if (hours.length === 2) {
                        const startHour = hours[0].trim();
                        const endHour = hours[1].trim();

                        const convertTo24HourFormat = (time) => {
                            const [hour, minuteAndPeriod] = time.split(':');
                            const [minute, period] = minuteAndPeriod.split(' ');
                            let hourInt = parseInt(hour);
                            if (period === 'PM' && hourInt !== 12) hourInt += 12;
                            if (period === 'AM' && hourInt === 12) hourInt = 0;
                            return `${hourInt}:${minute}`;
                        };


                        const start24h = convertTo24HourFormat(startHour);
                        const end24h = convertTo24HourFormat(endHour);

                        const formatHour = (time) => {
                            const [hour, minute] = time.split(':');
                            return minute === '00' ? `${parseInt(hour)}h` : `${parseInt(hour)}h${minute}`;
                        };

                        obj.hours = `${formatHour(start24h)} - ${formatHour(end24h)}`;
                    } else {
                        obj.hours = 'Fermé';
                    }
                }

                switch (obj.day) {
                    case 'Monday':
                        obj.day = 'Lundi';
                        break;
                    case 'Tuesday':
                        obj.day = 'Mardi';
                        break;
                    case 'Wednesday':
                        obj.day = 'Mercredi';
                        break;
                    case 'Thursday':
                        obj.day = 'Jeudi';
                        break;
                    case 'Friday':
                        obj.day = 'Vendredi';
                        break;
                    case 'Saturday':
                        obj.day = 'Samedi';
                        break;
                    case 'Sunday':
                        obj.day = 'Dimanche';
                        break;
                    default:
                        break;
                }
            });

            return splitOpeningHours;
        }

        return [];
    };

    if (bar?.opening_hours) {
        const translatedHours = translatedOpeningHours(bar.opening_hours);
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
                <p className="bar-card-description text-center font-text text-xs">{bar.opening_hours}</p>
                <div className="container-beers w-full flex-col justify-center items-center gap-1 mt-1">
                    <p className="bar-card-beers-title text-center font-text font-bold text-sm">Bières disponibles :</p>
                    <ul className="bar-card-beers-list flex justify-center items-start gap-1 flex-wrap">
                        {beersAvailable.map(beer => (
                            <li key={beer.beerId} className="bar-card-beer font-text text-sm rounded-full pr-3 pl-3 p-1 bg-primary text-light cursor-pointer">{`${beer.beerName} (${beer.beerType})`}</li>
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