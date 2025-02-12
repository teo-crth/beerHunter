import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/context';
import { fetchAllCities } from '../../api/city/cityCrud';
import { fetchGoogleBars, fetchOneGoogleBar, fetchBarMainImage } from '../../api/google_api/fetchGoogleApi';
import { fetchAllBeers } from '../../api/beer/beerCrud';
import { createBars, fetchBarsByCityId } from '../../api/bar/barsCrud';
import Button from './Button';


const SearchBar = () => {
    const [ cities, setCities ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedBeerId, setSelectedBeerId] = useState(null);
    const [ beers, setBeers ] = useState([]);
    const [bars, setBars] = useState([]);
    
    const { openModal, setOpenModal, setSearchResultBars } = useContext(AppContext);
    const GOOGLE_KEY = import.meta.env.GOOGLE_KEY;

    useEffect(() => {
        if (cities.length === 0) {
            fetchAllCities()
                .then(data => setCities(data))
                .catch(error => console.error(error));
        }
    }, [cities]);

    useEffect(() => {
        setFilteredCities(
            cities.filter(city => city.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        );
    }, [searchTerm, cities]);

    useEffect(() => {
        fetchAllBeers()
            .then(data => setBeers(data))
            .catch(error => console.error(error));
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const city = cities.find(city => city.id === selectedCityId);

        if (!city) {
            openModal('errorMessage', 'Veuillez sélectionner une ville dans la liste déroulante');
        }

        fetchBarsByCityId(selectedCityId)
        .then((data) => {
            if (data.length > 5) {
                setSearchResultBars(data);
                return;
            } else {
                // fetch bars by city id in bdd if no bars, call google api to get bars
                fetchGoogleBars(city.latitude, city.longitude)
                .then((data) => {
                    const barsToSave = [];
                    console.log('data du foreach', data);
                    
                    data.forEach((GoogleBar) => {

                        const bar = {
                            id: GoogleBar.place_id,
                            name: GoogleBar.name,
                            address: GoogleBar.vicinity,
                            latitude: GoogleBar.geometry.location.lat,
                            longitude: GoogleBar.geometry.location.lng,
                            rate: GoogleBar.rating ? GoogleBar.rating : null,
                            opening_hours: null,
                            city_id: selectedCityId,
                            bar_picture: null
                        };

                        if(GoogleBar.photos[0]) {
                            fetchBarMainImage(GoogleBar.photos[0].photo_reference)
                            .then((data) => {                           
                                bar.bar_picture = data;
                            })
                        }
                        
                        fetchOneGoogleBar(GoogleBar.place_id)
                        .then((data) => {

                            const openingHours = data.result.current_opening_hours.weekday_text.join(', ');
                            if (openingHours) { bar.opening_hours = openingHours;}
                        })
                        
                        barsToSave.push(bar);
                        // setBars(prevBars => [...prevBars, bar]);                      
                    })

                    console.log('barsToSave', barsToSave);
                    if (barsToSave.length > 0) {
                        
                        createBars(barsToSave)
                        .then(() => {
                            fetchBarsByCityId(selectedCityId)
                            .then((data) => {
                                setSearchResultBars(data);
                            })
                            .catch((error) => {
                                console.error(error);
                                openModal('errorMessage', 'Erreur lors de la récupération des bars');
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            openModal('errorMessage', 'Erreur lors de la création des bars');
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    openModal('errorMessage', 'Erreur lors de la récupération des bars depuis Google API');
                });
            }
        })

            
    }

    console.log('bars', bars);
    

    return (
        <div className='w-full md:w-2/3 lg:w-1/2 flex items-center justify-center'>
            <form action="submit" className='w-full flex items-center justify-between text-left border-primary border-2 rounded-lg m-5 text-light light-mode:text-dark-black'>
                <div className="container-city-input container-input-city relative flex items-center justify-center">
                    <input type="text" list="cities" className='w-2/3 p-2 bg-transparent border-0' placeholder='Entrez une ville' onChange={handleChange} value={searchTerm} required/>
                    {isDropdownOpen  && filteredCities.length > 0 && (
                        <ul className="absolute top-13 bg-dark text-light border border-primary overflow-y-scroll shadow-lg max-h-40 mt-1 rounded-md w-full z-10">
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
                <p className='text-primary'>|</p>
                <select name="beer" id="beer" className='p-2 bg-transparent border-0' onChange={(e) => setSelectedBeerId(e.target.value)} required>
                    <option value="" className='text-light light-mode:text-dark-black'>Choisir une bière</option>
                    {beers.map(beer => (
                        <option key={beer.id} value={beer.id} className='text-light light-mode:text-dark-black bg-dark-black light-mode:bg-light'>{beer.name}</option>
                    ))}
                </select>
                <Button type='submit' onClick={handleSubmit} className='bg-primary text-light light-mode:bg-dark rounded-r-lg h-10' text="Rechercher" />
            </form>
            
        </div>
    );
};

export default SearchBar;