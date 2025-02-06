import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarCrud = () => {
    const [bars, setBars] = useState([]);
    const [newBar, setNewBar] = useState('');

    useEffect(() => {
        fetchBars();
    }, []);

    const fetchBars = async () => {
        try {
            const response = await axios.get('/api/bars');
            setBars(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des bars', error);
        }
    };

    const createBar = async () => {
        try {
            const response = await axios.post('/api/bars', { name: newBar });
            setBars([...bars, response.data]);
            setNewBar('');
        } catch (error) {
            console.error('Erreur lors de la création du bar', error);
        }
    };

    const updateBar = async (id, updatedName) => {
        try {
            const response = await axios.put(`/api/bars/${id}`, { name: updatedName });
            setBars(bars.map(bar => (bar.id === id ? response.data : bar)));
        } catch (error) {
            console.error('Erreur lors de la mise à jour du bar', error);
        }
    };

    const deleteBar = async (id) => {
        try {
            await axios.delete(`/api/bars/${id}`);
            setBars(bars.filter(bar => bar.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du bar', error);
        }
    };

    return (
        <div>
            <h1>Bars</h1>
            <input
                type="text"
                value={newBar}
                onChange={(e) => setNewBar(e.target.value)}
                placeholder="Nouveau bar"
            />
            <button onClick={createBar}>Créer</button>
            <ul>
                {bars.map(bar => (
                    <li key={bar.id}>
                        <input
                            type="text"
                            value={bar.name}
                            onChange={(e) => updateBar(bar.id, e.target.value)}
                        />
                        <button onClick={() => deleteBar(bar.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BarCrud;
