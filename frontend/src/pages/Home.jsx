import { useState } from "react";
import Slider from "react-slick";
import SearchBar from "../components/searchBar/SearchBar";
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';

const bars = [
    {
        id: 1,
        name: "Le Bar du Coin",
        address: "12 Rue des Biers, Paris",
        openingHours: "12:00 - 02:00",
        beers: ["Pilsner", "IPA", "Blonde"],
        rating: 4.5,
        imageUrl: "https://theseum.fr/wp-content/uploads/2022/09/ayers-rock-bar-lyon-1-1.jpg",
    },
    {
        id: 2,
        name: "La Taverne",
        address: "45 Avenue de la Soif, Lyon",
        openingHours: "10:00 - 23:00",
        beers: ["Lager", "Amber", "Stout"],
        rating: 4.7,
        imageUrl: "https://theseum.fr/wp-content/uploads/2022/09/ayers-rock-bar-lyon-1-1.jpg",
    },
];

const comments = [
    {
        id: 1,
        userName: "Pierre",
        comment: "Super endroit, ambiance géniale et bières excellentes !",
        rating: 5,
    },
    {
        id: 2,
        userName: "Sophie",
        comment: "Très bonne bière IPA, mais un peu trop bruyant le soir.",
        rating: 4,
    },
    {
        id: 3,
        userName: "Marc",
        comment: "Un bar sympa, mais le service est un peu lent.",
        rating: 3.5,
    },
];

export default function Home() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
    };

    return (
        <>
            <section className="presentation font-text text-center flex flex-col items-center justify-center text-light light-mode:text-dark-black pt-5">
                <h1 className="text-2xl font-bold">Bienvenue sur BeerHunter !</h1>
                <h2 className="text-xl">Ne restez jamais sur votre soif</h2>
                <h3 className="text-xs mt-2">Trouvez les bars près de chez vous qui servent votre bière préférée</h3>
            </section>

            <SearchBar />

            <section className="mt-10">
                <h2 className="text-xl text-center font-semibold mb-4">Dernières recherches de bars</h2>
                <Slider {...settings}>
                    {bars.map((bar) => (
                        <div key={bar.id} className="w-full mt-6 flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3">
                                <img
                                    src={bar.imageUrl}
                                    alt={bar.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>

                            <div className="w-full md:w-2/3 text-left">
                                <h3 className="text-lg font-bold">{bar.name}</h3>
                                <p className="text-sm">{bar.address}</p>
                                <p className="text-sm font-semibold mt-2">Heures d'ouverture: {bar.openingHours}</p>
                                <p className="text-sm mt-2">Bières servies: {bar.beers.join(", ")}</p>
                                <div className="mt-2">
                                    <span className="text-yellow-500">
                                        {"★".repeat(Math.floor(bar.rating))}{" "}
                                        {bar.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            <section className="mt-10">
                <h2 className="text-xl text-center font-semibold mb-4">Derniers commentaires</h2>
                <Slider {...settings}>
                    {comments.map((comment) => (
                        <div key={comment.id} className="w-full mt-6 flex flex-col md:flex-row gap-6">

                            <div className="w-full md:w-1/3">
                                <p className="text-sm font-bold mt-2">- {comment.userName}</p>
                                <p className="text-sm italic">"{comment.comment}"</p>
                                <div className="mt-2">
                                    <span className="text-yellow-500">
                                        {"★".repeat(Math.floor(comment.rating))}{" "}
                                        {comment.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </>
    );
}
