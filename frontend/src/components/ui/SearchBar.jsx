import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'src/context/context';
import { fetchAllCities } from '../../api/city/cityCrud';
import { fetchGoogleBars } from '../../api/google_api/fetchGoogleApi';
import Button from './Button';

const SearchBar = () => {
    const [ cities, setCities ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);

    const { openModal, setOpenModal, setSearchResultBars } = useContext(AppContext);

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

        // fetch bars by city id in bdd if no bars, call google api to get bars
        fetchGoogleBars(city.latitude, city.longitude)
            .then((data) => {
                console.log(data)
                // ADD THE BARS TO THE DATABASE
                // fetchBarsByCityId(selectedCityId) from bdd
                // setSearchResultBars(dataFromBdd)
            })
            .catch((error) => {
                console.error(error);
                openModal('errorMessage', 'Erreur lors de la récupération des bars');
            });
    }

    return (
        <div className='w-full md:w-2/3 lg:w-1/2 flex items-center justify-center'>
            <form action="submit" className='w-full flex items-center justify-between text-left border-primary border-2 rounded-lg m-5 text-light light-mode:text-dark-black'>
                <div className="container-city-input container-input-city relative flex flex-col items-center justify-center">
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
                <Button type='submit' onclick={handleSubmit} className='bg-primary text-light light-mode:bg-dark rounded-r-lg h-10' text="Rechercher" />
            </form>
            
        </div>
    );
};

export default SearchBar;