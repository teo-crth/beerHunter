import React, { useState } from 'react';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const [distance, setDistance] = useState('');
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log('Recherche lancée avec:', { city, distance, query });
    };

    return (
        <div className="flex justify-between items-center p-4 mb-6 bg-gray-100">
            <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-1/5 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
                <option value="">Sélectionner une ville</option>
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
            </select>
            <select
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-1/5 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
                <option value="">Distance</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="20">20 km</option>
            </select>
            <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-2/5 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button
                onClick={handleSearch}
                className="'px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600"
            >
                Rechercher
            </button>
        </div>
    );
};

export default SearchBar;
