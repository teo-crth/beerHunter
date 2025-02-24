import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { LoadScript } from '@react-google-maps/api';
import ReactStars from 'react-stars';
import Button from '../components/ui/Button';
import { AppContext } from '../context/context';
import { addFavoriteBar, deleteFavoriteBar } from '../api/favorites_bar/favoritesBarCrud';
import { translatedOpeningHours } from '../services/translateOpeningHours';
import { fetchBeersAvailableForOneBar } from '../api/beer/beersAvailableInBar';
import Modal from '../components/ui/Modal';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import AllComments from '../components/bar/AllComments';

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
            try {
                const beers = await fetchBeersAvailableForOneBar(id)
                setBeersAvailable(beers);
            } catch(error) {console.error(error)};
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

    const openingHours = translatedOpeningHours(bar?.opening_hours);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const handleFavoriteClick = async () => {
        if (user.favoritesBars?.includes(bar.id)) {
            openModal('errorMessage', 'Ce bar est déjà dans vos favoris');
            return;
        } else {
            try {
                await addFavoriteBar(user.id, id)
                openModal('successMessage', 'Le bar a bien été ajouté à vos favoris');
                if (user.favoritesBars) {
                setUser((prev) => ({ ...prev, favoritesBars: [...prev.favoritesBars, bar] }));
                } else {
                    setUser((prev) => ({ ...prev, favoritesBars: [bar] }));
                }
            } catch(error) {
                console.error(error);
                openModal('errorMessage', 'Une erreur est survenue lors de l\'ajout du bar à vos favoris');
            };
        }
    };

    const handleDeleteFavoriteClick = async () => {
        try {
            await deleteFavoriteBar(user.id, id)
            openModal('successMessage', 'Le bar a bien été supprimé de vos favoris');
            setUser((prev) => ({ ...prev, favoritesBars: prev.favoritesBars.filter(favBar => favBar.id !== bar.id) }));
        } catch(error) {
            console.error(error);
            openModal('errorMessage', 'Une erreur est survenue lors de la suppression du bar de vos favoris');
        };
    }

    const handleChangeClick = () => openModal('addComment');

    return (
        <>
            <div className='container-barPage min-h-[calc(100vh-159px)] flex flex-col items-center justify-center w-full light-mode:bg-light md:p-10 lg:p-20 xl:p-20'>
                <section className="container-bar-img-description flex flex-wrap justify-center items-center w-full mb-5">
                    <div className="container-img flex flex-col justify-center items-center w-[95%] md:w-[40%] lg:w-[40%] xl:w-[40%] h-[25em]">
                        <img
                            src={`${BASE_URL}${bar?.bar_picture}`}
                            alt={`photo ${bar?.name}`}
                            className='rounded-lg object-cover h-full w-full shadow-md'
                        />
                        {isLogin && !user?.favoritesBars?.some(favBar => favBar.id === bar.id) && (
                            <Button text="Ajouter aux favoris" className="bg-primary mt-2" onClick={handleFavoriteClick}/>
                        )}
                        {isLogin && user?.favoritesBars?.some(favBar => favBar.id === bar.id) && (
                            <Button text="Supprimer des favoris" className="bg-primary mt-2" onClick={handleDeleteFavoriteClick}/>
                        )}
                    </div>
                    <div className='container-description flex flex-col justify-start gap-3 p-3 items-start w-[95%] md:w-[60%] lg:w-[60%] xl:w-[60%] h-[25em]'>
                        <div className="container-title w-full flex flex-col justify-start items-center mt-2">
                            <h1 className='font-title font-bold text-center text-2xl text-light light-mode:text-dark-black tracking-wider'>{bar?.name}</h1>
                            <div className='container-rating flex items-center justify-center gap-2'>
                                <span className='font-bold font-text text-md text-light light-mode:text-dark-black'>
                                    Note : {bar?.rate}/5
                                </span>
                                <ReactStars
                                    count={5}
                                    value={bar?.rate}
                                    size={24}
                                    activeColor="#FEC514"
                                    edit={false}
                                />
                            </div>
                        </div>
                        <div className='container-openingHours w-full flex  flex-col justify-center items-center gap-3'>
                            <h1 className='font-bold font-title text-light light-mode:text-dark-black text-md text-center'>Horaires d'ouverture</h1>
                            <ul className='font-text text-light light-mode:text-dark-black text-md text-center flex flex-wrap justify-center items-center gap-1'>
                                {openingHours.map((item, index) => (
                                    <li key={index} className='border-2 border-primary rounded-lg p-0.5 whitespace-nowrap'>
                                        <strong>{item.day} :</strong> {item.hours}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='container-availableBeers flex flex-col justify-start items-center w-full'>
                            <h1 className='font-title text-center text-lg text-light light-mode:text-dark-black font-bold'>Bières disponibles pour ce bar</h1>
                            <div className='w-full md:w-[80%] lg:w-[80%] xl:w-[80%] items-center'>
                                <Slider {...settings}>
                                    {beersAvailable.length > 0 && beersAvailable.map((beer, index) => (
                                        <div key={index} className='flex items-center justify-center p-1 cursor-pointer' onClick={() => handleBeerClick(beer.id)} aria-label={`Navigation vers la page de la bière ${beer.name}`}>
                                            <img src={`${BASE_URL}${beer.image_link}`} alt={`Biere-${index}`} className='border-1 border-primary rounded-2xl items-center' />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
                <aside className="flex w-full mt-5 flex-col items-center justify-center">
                    <div className='container-map flex flex-col items-center justify-center w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%]'>
                        <LoadScript googleMapsApiKey={GOOGLE_KEY} onLoad={handleScriptLoad} libraries={LIBRAIRIES}>
                            <div ref={mapRef} className='shadow-md rounded-lg w-full h-80' />
                        </LoadScript>
                        <div className='container-address flex flex-col items-center justify-center w-full text-light light-mode:text-dark-black p-2'>
                            <p className='font-text text-sm'><strong>Adresse : </strong>{bar?.address}</p>
                            <p className='font-text text-sm'><strong>Téléphone : </strong>{bar?.phone_number}</p>
                            <a href={bar?.website} target='blank' className='font-text text-md text-blue-600 underline cursor-pointer'>Site internet</a>
                        </div>
                    </div>
                </aside>
                { isLogin && (
                    <div className='coontainer-button flex flex-col items-center justify-center w-full p-5'>
                        <Button text="Ajouter un commentaire" className='bg-primary hover:bg-secondary' onClick={handleChangeClick} />
                    </div>
                )}
                < AllComments barId={id} />
            </div>
            <Modal />
        </>
    );
};

export default BarPage;
