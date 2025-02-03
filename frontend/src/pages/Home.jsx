import logo from "../assets/logo.svg";
import SearchBar from "../components/ui/SearchBar";

export default function Home() {
  return (
   <div className="container-home flex flex-col items-center justify-center bg-dark light-mode:bg-light pb-5  text-light light-mode:text-dark-black">
    <section className="presentation font-text text-center flex flex-col items-center justify-center pt-5">
      <h1 className="text-2xl font-bold p-1">Bienvenue sur BeerHunter !</h1>
      <h2 className="text-xl">Ne restez jamais sur votre soif</h2>
      <h3 className="text-xs mt-2">Trouver les bars près de chez vous qui servent votre bière préférée</h3>
    </section>
    <SearchBar />
   </ div>
  );
}
