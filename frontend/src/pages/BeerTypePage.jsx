import React, { useEffect, useState } from 'react';
import { fetchAllBeerTypes } from '../api/beerType/beerTypeCrud';

const BeerTypePage = () => {
    const [beerTypes, setBeerTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTypeId, setSelectedTypeId] = useState(null);

    const handleRevealText = (id) => {
        setSelectedTypeId(prevId => (prevId === id ? null : id));
    }

    useEffect(() => {
        const getBeerTypes = async () => {
            try {
                const data = await fetchAllBeerTypes();
                setBeerTypes(data);
            } catch (err) {
                setError('Erreur lors du chargement des types de bières.');
            } finally {
                setLoading(false);
            }
        };
        getBeerTypes();
    }, []);

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-2xl font-title font-bold mb-4 text-center text-light light-mode:text-dark-black p-5">Types de Bières</h1>
            {loading && <p className="text-center text-gray-600">Chargement...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="flex flex-wrap w-[95%] md:w-[80%] lg:w-[70%] justify-center items-center gap-4 cursor-pointer">
                {beerTypes.map((type) => (
                    <div
                        key={type.id}
                        className="border rounded-lg pr-4 pl-4 items-center justify-center shadow-md hover:shadow-lg transition text-light light-mode:text-dark-black"
                        onClick={() => handleRevealText(type.id)}
                    >
                        <h2 className="text-lg text-center font-semibold font-title p-1">{type.name}</h2>
                        {selectedTypeId === type.id && (
                            <p className="font-text p-3 text-justify">{type.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BeerTypePage;
