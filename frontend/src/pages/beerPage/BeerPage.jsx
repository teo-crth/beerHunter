import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchOneBeer } from '../../api/beer/beerCrud';
import { fetchOneBeerType } from '../../api/beerType/beerTypeCrud';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const BeerPage = () => {
    const { id } = useParams();
    const [beer, setBeer] = useState(null);
    const [beerType, setBeerType] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            await fetchOneBeer(id)
            .then(beer => {
                setBeer(beer)

                fetchOneBeerType(beer.beer_type_id)
                .then(beerType => setBeerType(beerType))
                .catch(error => console.error(error));
                
                console.log("beertype", beerType);
            })
            .catch(error => console.error(error));



            
        }

        fetch();
    }, []);
   
    const images = [
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QV1NhER3k-Q61-Xs9oJb7M43tuePteX7rL_e2oAUM2HddEs5Uf4TEpiaSkvyh5r9YaM&usqp=CAU",
        "https://i.pinimg.com/736x/59/32/6f/59326f0a35c1d851e0d56690970fcccc.jpg",
        "https://www.brasserieartisanaleduder.fr/wp-content/uploads/2024/10/bragarde.jpg",
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QV1NhER3k-Q61-Xs9oJb7M43tuePteX7rL_e2oAUM2HddEs5Uf4TEpiaSkvyh5r9YaM&usqp=CAU",
        "https://i.pinimg.com/736x/59/32/6f/59326f0a35c1d851e0d56690970fcccc.jpg",
        "https://www.brasserieartisanaleduder.fr/wp-content/uploads/2024/10/bragarde.jpg"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    const name = 'Guinness';
    const alcoolDegree = '5.5';
    const Type = 'Bière stout';
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
                <div className='flex flex-col items-start justify-center w-[95%] md:w-[65%] lg:w-[65%] ml-5 gap-3'>
                    <h1 className='font-title font-bold text-4xl text-light light-mode:text-dark-black'>{beer?.name}</h1>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'><strong>Degré d'alcool :</strong> {beer?.alcool_degree}%</p>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'><strong>Type :</strong> {beerType?.name}</p>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'>
                    <strong>Description :</strong> {Description}
                    </p>
                    <p className='font-title text-xl text-light light-mode:text-dark-black'><strong>Arômes :</strong> {taste}</p>
                </div>
            </div>
            <h1 style={{ margin: '0 0 10px', color: '#333' }}>Bières similaires</h1>
            <div style={{ width: '100%', marginTop: '2em' }}>
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className='flex items-center justify-center p-1'>
                            <img src={img} alt={`Biere-${index}`} style={{ width: '20em', borderRadius: '1em', margin: '0 1em' }} />

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BeerPage;
