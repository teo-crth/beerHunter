import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/context';
import { fetchAllCities } from '../../api/city/cityCrud';
import { fetchGoogleBars, fetchOneGoogleBar, fetchBarMainImage } from '../../api/google_api/fetchGoogleApi';
import { fetchAllBeers } from '../../api/beer/beerCrud';
import { createBars, fetchBarsByCityId } from '../../api/bar/barsCrud';
import { fetchAllBeersAvailable, createBeersAvailable } from '../../api/beer/beersAvailableInBar';

import Button from './Button';
import Dropdown from './Dropdown';


const SearchBar = () => {
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedBeerId, setSelectedBeerId] = useState(null);
    const [beersAvailable, setBeersAvailable] = useState([]);
    const [beers, setBeers] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    
    const { openModal, setOpenModal, setSearchResultBars, bars, setBars, pastResultBars, setPastResultBars } = useContext(AppContext);
    const GOOGLE_KEY = import.meta.env.GOOGLE_KEY;

    useEffect(() => {
        if (cities.length === 0) {
            fetchAllCities()
                .then(data => setCities(data))
                .catch(error => console.error(error));
        }
    }, []);

    useEffect(() => {
        setFilteredCities(
            cities.filter(city => city.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        );
    }, [searchTerm, cities]);

    useEffect(() => {
        const fetchBeers = async () => {
            await fetchAllBeers()
            .then(data => setBeers(data))
            .catch(error => console.error(error));
        }

        fetchBeers();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSelectedCityId(null);

        const containsDigit = /\d/.test(value);
        setIsDropdownOpen(value.length > 0 && !containsDigit);
    }

    const handleCityClick = (cityName, cityCode, cityId) => {
        setSearchTerm(`${cityName} (${cityCode})`);
        setIsDropdownOpen(false);
        setSelectedCityId(cityId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBars([]);
        setIsloading(true);

        const city = cities.find(city => city.id === selectedCityId);

        if (!city) {
            openModal('errorMessage', 'Veuillez sélectionner une ville dans la liste déroulante');
        }

        try {

            const barsFromDB = await fetchBarsByCityId(selectedCityId);          

            if (barsFromDB.length > 2) {
                if (selectedBeerId) {    
                    console.log('beerAvailable', beersAvailable);
                                   
                    const barsWithBeerSelected = barsFromDB.filter(bar => beersAvailable.some(beer => beer.bar_id === bar.id && beer.beer_id === selectedBeerId));
                    setSearchResultBars(barsWithBeerSelected);
                    return;
                } else {
                    setSearchResultBars(barsFromDB);
                    return;
                }

            } else {
                const googleBars = await fetchGoogleBars(city.latitude, city.longitude);
                const barsToSave = [];
                
                await Promise.all(googleBars.map(async (GoogleBar) => {
                    const bar = {
                        id: GoogleBar.place_id,
                        name: GoogleBar.name,
                        address: GoogleBar.vicinity,
                        latitude: GoogleBar.geometry.location.lat,
                        longitude: GoogleBar.geometry.location.lng,
                        rate: GoogleBar.rating ? GoogleBar.rating : null,
                        opening_hours: null,
                        city_id: selectedCityId,
                        photo_reference: GoogleBar.photos && GoogleBar.photos[0] ? GoogleBar.photos[0].photo_reference : null,
                        phone_number: null,
                        maps_url: null,
                        website: null
                    };
                        
                    const googleBarDetails = await fetchOneGoogleBar(GoogleBar.place_id);
                    const openingHours = googleBarDetails.result.current_opening_hours?.weekday_text?.join(', ');
                    const phone = googleBarDetails.result.formatted_phone_number;
                    const mapsUrl = googleBarDetails.result.url;
                    const website = googleBarDetails.result.website;

                    if (openingHours) bar.opening_hours = openingHours;
                    if (phone) bar.phone_number = phone;
                    if (mapsUrl) bar.maps_url = mapsUrl;
                    if (website) bar.website = website;
                        
                    barsToSave.push(bar);                  
                }));

                if (barsToSave.length > 0) {
                    const createdBars = await createBars(barsToSave);                    
                    const beersToSave = [];

                    createdBars.bars.forEach((bar) => {
                        const randomBeers = beers.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 2);                        
                        randomBeers.forEach(beer => {
                            beersToSave.push({ bar_id: bar.id, beer_id: beer.id });
                        });
                    });

                    await createBeersAvailable(beersToSave);
                    await fetchAllBeersAvailable()
                    .then(data => setBeersAvailable(data))
                    .catch(error => console.error(error));
                    
                    setBars(createdBars.bars);
                    console.log('bars créé en bdd', createdBars.bars);
                    

                    if (selectedBeerId) {    
                        console.log('beerAvailable', beersAvailable);
                                            
                        const barsWithBeerSelected = bars.filter(bar => beersAvailable.some(beer => beer.bar_id === bar.id && beer.beer_id === selectedBeerId));
                        setSearchResultBars(barsWithBeerSelected);
                        setPastResultBars(barsWithBeerSelected);     
                    } else {
                        setSearchResultBars(bars);
                        setPastResultBars(bars);
                    }
                }
            }
        } catch (error) {
            console.error(error);
            openModal('errorMessage', 'Erreur lors de la récupération des bars depuis Google API');
        } finally {
            setIsloading(false);
        } 
    }   

    console.log('selectedd bedd', selectedBeerId);
    

    return (
        <div className='w-full md:w-[60%] lg:w-[40%] flex items-center justify-center'>
            <form action="submit" className='w-full flex flex-col md:flex-row lg:flex-row items-center justify-center gap-1 text-center md:text-left lg:text-left xl:text-left m-5 text-light light-mode:text-dark-black'>
                <div className="container-city-input container-input-city relative flex items-center justify-center w-full md:w-1/2 lg:1/2">
                    <input type="text" list="cities" className='w-full p-2 bg-transparent text-center border-2 border-primary rounded-lg' placeholder='Entrez une ville' onChange={handleChange} value={searchTerm}/>
                    {isDropdownOpen  && filteredCities.length > 0 && (
                        <ul className="absolute top-13 bg-dark text-light border border-primary overflow-y-scroll shadow-lg max-h-30 mt-1 rounded-md w-full z-10">
                            {filteredCities.map((city) => (
                                <li
                                    key={city.id}
                                    className="p-2 cursor-pointer hover:bg-dark-black"
                                    onClick={() => handleCityClick(city.name, city.code, city.id)}
                                >
                                    {`${city.name} (${city.code})`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Dropdown beers={beers} setSelectedBeerId={setSelectedBeerId} selectedBeerId={selectedBeerId} />
                {isLoading && <p>Chargement...</p>}
                { !isLoading && <Button type='submit' onClick={handleSubmit} className='bg-primary text-light light-mode:bg-dark rounded-r-lg h-10' text="Rechercher" />}
            </form>
            
        </div>
    );
};

export default SearchBar;