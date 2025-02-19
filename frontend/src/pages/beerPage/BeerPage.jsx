import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchOneBeer, fetchBeersOftype } from '../../api/beer/beerCrud';
import { fetchOneBeerType } from '../../api/beerType/beerTypeCrud';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const BeerPage = () => {
    const { id } = useParams();
    const [beer, setBeer] = useState(null);
    const [beerType, setBeerType] = useState(null);
    const [similarBeers, setSimilarBeers] = useState([]);
    const navigate = useNavigate();

    const handleBeerClick = (beerId) => {
        navigate(`/bieres/${beerId}`);
    };

    useEffect(() => {
        const fetch = async () => {
            await fetchOneBeer(id)
            .then(beer => {
                setBeer(beer)

                console.log("beer", beer);
                fetchOneBeerType(beer.beer_type_id)
                .then(beerType => {
                    setBeerType(beerType)
                    fetchBeersOftype(beerType.name)
                    .then(beers => {
                        setSimilarBeers(beers);
                        
                    })
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        }

        fetch();
    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const Description = "Guinness est une bière emblématique d'Irlande, célèbre pour sa texture onctueuse et son goût unique qui mélange des notes de malt torréfié et une subtile amertume.";
    const taste = 'Café, chocolat, malt torréfié';


    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <div className='flex items-center justify-center m-3 w-full flex-wrap'>
                <img
                    src={`${BASE_URL}${beer?.image_link}`}	
                    alt={`image ${beer?.name}`}
                    className='rounded-lg w-[95%] md:w-[29%] lg:w-[29%] border-2 border-primary shadow-lg'
                />
                <div className='flex flex-col items-start justify-center w-[95%] md:w-[65%] lg:w-[65%] p-5 gap-3'>
                    <h1 className='font-title font-bold text-4xl text-light light-mode:text-dark-black'>{beer?.name}</h1>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'><strong>Degré d'alcool :</strong> {beer?.alcool_degree}%</p>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'><strong>Type :</strong> {beerType?.name}</p>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'>
                    <strong>Description :</strong> {beer?.description}
                    </p>
                </div>
            </div>
            <h1 className='font-title font-bold text-2xl text-light light-mode:text-dark-black'>Bières similaires</h1>
            <div className='w-full md:w-2/3 lg:w-2/3 p-2'>
                <Slider {...settings}>
                    {similarBeers && similarBeers.map((beer, index) => (
                        <div key={index} className='flex items-center justify-center p-3 cursor-pointer' onClick={() => handleBeerClick(beer.beer_id)} aria-label={`Navigation vers la page de la bière ${beer.name}`}>
                            <img src={`${BASE_URL}${beer?.image_link}`} alt={`image ${beer?.name}`} className='rounded-2xl border-2 border-primary' />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BeerPage;
