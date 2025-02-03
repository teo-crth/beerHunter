import logo from "../assets/logo.svg";
import SearchBar from "../components/ui/SearchBar";

export default function Home() {

    return (
        <>
            <section className="presentation font-text text-center flex flex-col items-center justify-center text-light light-mode:text-dark-black pt-5">
                <h1 className="text-2xl font-bold ">Bienvenue sur BeerHunter !</h1>
                <h2 className="text-xl">Ne restez jamais sur votre soif</h2>
                <h3 className="text-xs mt-2">Trouver les bars près de chez vous qui servent votre bière préférée</h3>
            </section>
            <SearchBar />
        </>
    );
}
