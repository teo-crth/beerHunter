import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fonction pour récupérer les bars
export const fetchBars = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/bars`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bars', error);
        throw error; // Lance l'erreur pour la gérer plus tard si nécessaire
    }
};

// Fonction pour créer un bar
export const createBar = async (bar, setBars, bars, setNewBar) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/bars`, {
            name: bar.name,
            address: bar.address,
            latitude: bar.latitude,
            longitude: bar.longitude,
            rate: bar.rate,
            opening_hours: bar.opening_hours,
            city_id: bar.city_id,
            id: bar.id
        });
        setBars([...bars, response.data]);
        setNewBar(''); // Réinitialise le formulaire ou l'état lié à la création de nouveaux bars
    } catch (error) {
        console.error('Erreur lors de la création du bar', error);
        throw error;
    }
};

// Fonction pour mettre à jour un bar
export const updateBar = async (id, updatedBar, setBars, bars) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/bars/${id}`, updatedBar);
        setBars(bars.map(bar => (bar.id === id ? response.data : bar)));
    } catch (error) {
        console.error('Erreur lors de la mise à jour du bar', error);
        throw error;
    }
};

// Fonction pour supprimer un bar
export const deleteBar = async (id, setBars, bars) => {
    try {
        await axios.delete(`${BASE_URL}/api/bars/${id}`);
        setBars(bars.filter(bar => bar.id !== id));
    } catch (error) {
        console.error('Erreur lors de la suppression du bar', error);
        throw error;
    }
};
