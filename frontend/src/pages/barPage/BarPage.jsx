import React, { useEffect, useState, useRef, useContext } from 'react';
import { AppContext } from '../../context/context';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { LoadScript } from '@react-google-maps/api';
import ReactStars from 'react-stars';
import Button from '../../components/ui/Button';
import { addFavoriteBar, deleteFavoriteBar } from '../../api/favorites_bar/favoritesBarCrud';
import { translatedOpeningHours } from '../../services/translateOpeningHours';
import { fetchOneUser } from '../../api/user/oneUserCrud';
import { fetchBeersAvailableForOneBar } from '../../api/beer/beersAvailableInBar';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import Modal from '../../components/ui/Modal';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY; 
const MAP_ID = import.meta.env.VITE_MAP_ID; 
const LIBRAIRIES = ['places', 'marker'];

const BarPage = () => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);   
    const { id } = useParams();
    const location = useLocation();
    const barObject = location.state;
    const navigate = useNavigate();
    
    const [bar, setBars] = useState(barObject);
    const [beersAvailable, setBeersAvailable] = useState([]);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const { isLogin, user, openModal, setUser } = useContext(AppContext);
    
    useEffect(() => {
        const fetchBeers = async () => {
            await fetchBeersAvailableForOneBar(id)
            .then(beers => setBeersAvailable(beers))
            .catch(error => console.error(error));
        }

        fetchBeers();
    }, []);

    useEffect(() => {
        if (mapRef.current && bar) {
            const { google } = window;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: bar.latitude, lng: bar.longitude },
                zoom: 18,
                mapId: MAP_ID
            });

            markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                position: new google.maps.LatLng(bar.latitude, bar.longitude),
                map: map,
            });
        }
    }, [googleLoaded]);

    const handleBeerClick = (beerId) => {     
        navigate(`/bieres/${beerId}`);
    };

    const handleScriptLoad = () => {
        setGoogleLoaded(true);
    };

    const openingHours = translatedOpeningHours(bar.opening_hours);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const handleFavoriteClick = () => {
        if (user.favoritesBars.includes(bar.id)) {
            openModal('errorMessage', 'Ce bar est déjà dans vos favoris');
            return;
        } else {
            addFavoriteBar(user.id, id)
            .then(() => {
                openModal('successMessage', 'Le bar a bien été ajouté à vos favoris');
                setUser((prev) => ({ ...prev, favoritesBars: [...prev.favoritesBars, bar] }));
            })
            .catch(error => {
                console.error(error);
                openModal('errorMessage', 'Une erreur est survenue lors de l\'ajout du bar à vos favoris');
            });
        }
    };

    const handleDeleteFavoriteClick = () => {
        deleteFavoriteBar(user.id, id)
        .then(() => {
            openModal('successMessage', 'Le bar a bien été supprimé de vos favoris');
            setUser((prev) => ({ ...prev, favoritesBars: prev.favoritesBars.filter(favBar => favBar.id !== bar.id) }));
        })
        .catch(error => {
            console.error(error);
            openModal('errorMessage', 'Une erreur est survenue lors de la suppression du bar de vos favoris');
        });
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6em' }}>
                <img
                    src={`${BASE_URL}${bar.bar_picture}`}
                    alt={`photo ${bar.name}`}
                    style={{ width: '50em', height: '30em', borderRadius: '1em', marginRight: '4em' }}
                />
                <div>
                    <h1 style={{ margin: '0 0 10px', color: '#333' }}>{bar.name}</h1>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>
                            Note : {bar.rate}/5
                        </span>
                        <ReactStars
                            count={5}
                            value={bar.rate}
                            size={24}
                            activeColor="#FEC514"
                            edit={false}
                        />
                        {isLogin && !user?.favoritesBars?.some(favBar => favBar.id === bar.id) && (
                            <Button text="Ajouter aux favoris" className="bg-primary" onClick={handleFavoriteClick}/>
                        )}
                        {isLogin && user?.favoritesBars?.some(favBar => favBar.id === bar.id) && (
                            <Button text="Supprimer des favoris" className="bg-primary" onClick={handleDeleteFavoriteClick}/>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', marginTop: '2em' }}>
                <div style={{ width: '40%', textAlign: 'center' }}>
                    <h1 className='font-title text-center text-md text-light light-mode:text-dark-black font-bold p-1'>Bières disponibles</h1>
                    <div className='w-full items-center'>
                        <Slider {...settings}>
                            {beersAvailable.length > 0 && beersAvailable.map((beer, index) => (
                                <div key={index} className='flex items-center justify-center p-1 cursor-pointer' onClick={() => handleBeerClick(beer.id)} aria-label={`Navigation vers la page de la bière ${beer.name}`}>
                                    <img src={`${BASE_URL}${beer.image_link}`} alt={`Biere-${index}`} className='border-1 border-primary rounded-2xl items-center' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div style={{ width: '30%', marginLeft: 'auto' }}>
                    <LoadScript googleMapsApiKey={GOOGLE_KEY} onLoad={handleScriptLoad} libraries={LIBRAIRIES}>
                        <div ref={mapRef} style={{ width: '100%', height: '300px' }} />
                    </LoadScript>
                    <div style={{ marginTop: '1em', color: '#333', textAlign: 'center' }}>
                        <p className='font-text text-sm'><strong>Adresse : </strong>{bar.address}</p>
                        <p className='font-text text-sm'><strong>Téléphone : </strong>{bar.phone_number}</p>
                        <a href={bar.website} target='blank' className='font-text text-sm text-blue-600 underline cursor-pointer'>Site internet</a>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '2em' }}>
                <div style={{ width: '40%' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1em' }}>Horaires d'ouverture</h1>
                    <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', color: '#666' }}>
                        {openingHours.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                <strong>{item.day} :</strong> {item.hours}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ width: '60%', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px', marginRight: 'auto' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#FFA500',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Ajoutez Bière
                    </button>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#FFA500',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Ajoutez Commentaire
                    </button>
                </div>
            </div>
            <Modal />
        </div>
    );
};

export default BarPage;
