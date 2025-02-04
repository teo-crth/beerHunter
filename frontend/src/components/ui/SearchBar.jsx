import React, { useEffect, useState } from 'react';
import { fetchAllCities } from '../../api/city/cityCrud';
import Button from './Button';

const SearchBar = () => {
    const [ cities, setCities ] = useState([]);
    const [ searchTerms, setSearchTerms ] = useState('');

    useEffect(() => {
        const fetchCitiesData = async () => {

            try {
                const response = await fetchAllCities();
                setCities(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des villes:', error);
            }
        }

        fetchCitiesData();

    }, []);

    const handleChange = (e) => {
        setSearchTerms(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Recherche de ville');
    }

    return (
        <div className='w-full md:w-2/3 lg:w-1/2 flex items-center justify-center'>
            <form action="submit" className='w-full flex items-center justify-between text-left border-primary border-2 rounded-lg m-5 text-light light-mode:text-dark-black'>
                <input type="text" list="cities" className='w-2/3 p-2 bg-transparent border-0' placeholder='Entrez une ville' onChange={handleChange} value={searchTerms} />
                <Button type='submit' onclick={handleSubmit} className='bg-primary text-light light-mode:bg-dark rounded-r-lg h-10' text="Rechercher" />
            </form>
            
        </div>
    );
};

export default SearchBar;