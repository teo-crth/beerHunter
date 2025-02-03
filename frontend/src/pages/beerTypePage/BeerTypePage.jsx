import React, { useEffect, useState } from 'react';
import { fetchAllBeerTypes } from './beer-type-crude';

const BeerTypePage = () => {
    const [beerTypes, setBeerTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Types de Bières</h1>
            {loading && <p className="text-center text-gray-600">Chargement...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {beerTypes.map((beer, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold mb-2">{beer.name}</h2>
                        <p className="text-gray-700">{beer.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BeerTypePage;