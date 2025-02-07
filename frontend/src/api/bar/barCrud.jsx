import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchBars = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/bars`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bars', error);
    }
};

export const createBar = async () => {
    try {
        const response = await axios.post('/api/bars', { name: newBar });
        setBars([...bars, response.data]);
        setNewBar('');
    } catch (error) {
        console.error('Erreur lors de la création du bar', error);
    }
};

export const updateBar = async (id, updatedName) => {
    try {
        const response = await axios.put(`/api/bars/${id}`, { name: updatedName });
        setBars(bars.map(bar => (bar.id === id ? response.data : bar)));
    } catch (error) {
        console.error('Erreur lors de la mise à jour du bar', error);
    }
};

export const deleteBar = async (id) => {
    try {
        await axios.delete(`/api/bars/${id}`);
        setBars(bars.filter(bar => bar.id !== id));
    } catch (error) {
        console.error('Erreur lors de la suppression du bar', error);
    }
};

