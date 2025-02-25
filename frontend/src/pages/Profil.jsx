import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/context";
import ProfilCard from "../components/Profil/ProfilCard";
import CommentsCard from "../components/Profil/CommentsCard";
import FavoritesBarCard from "../components/Profil/FavoritesBarCard";
import Modal from "../components/ui/Modal";
import NotFoundPage from "./NotFoundPage";
import { fetchFavoritesBar } from "../api/favorites_bar/favoritesBarCrud";
import Button from "../components/ui/Button";


export default function Profil() {
  
  const { user, setUser, openModal, isLogin, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();
  console.log('user', user);
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if(user) {          
          const favoritesBarsData = await fetchFavoritesBar(user?.id);
          setUser((prev) => ({ ...prev, favoritesBars: favoritesBarsData }));
        }
        
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    
    fetchUserData();
  }, []); 
  
  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate("/");
    openModal("successMessage", "Déconnexion réussie");
  };
  
  if (!isLogin) return <NotFoundPage />;
  
  return (
    <div className="container-profilPage min-h-[calc(100vh-159px)] justify-center items-center flex flex-col">
      <h1 className=" light-mode:bg-amber-100 text-light light-mode:text-dark text-center text-3xl font-title font-bold p-5">Mon profil</h1>
      <div className="container-profil w-full min-h-full flex flex-wrap items-start justify-center light-mode:bg-amber-100 p-2 pb-5">
        <ProfilCard user={user} />
        <section className="container-commentsAndBars flex flex-col justify-center items-center w-full p-2  md:w-[60%] lg:w-[60%] xl:w-[60%]">
          <CommentsCard user={user} />
          <FavoritesBarCard user={user} />
        </section>
      </div>
      <Button text="Déconnexion" onClick={handleLogout} className="bg-red-700 m-5" />
      <Modal />
    </div>
  );
}
