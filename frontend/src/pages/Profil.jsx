import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import ProfilCard from "../components/profil/ProfilCard";
import CommentsCard from "../components/profil/CommentsCard";
import FavoritesBarCard from "../components/profil/FavoritesBarCard";
import Modal from "../components/ui/Modal";


import { fetchOneUser } from "../api/user/oneUserCrud";
import { fetchCommentsOfOneUser } from "../api/user_comments/commentsCrud";


export default function Profil() {

  const {
    user,
    setUser,
    openModal
  } = useContext(AppContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchOneUser(4);
        setUser(userData);
  
        const commentsData = await fetchCommentsOfOneUser(userData.id);
        setUser((prev) => ({ ...prev, comments: commentsData }));

        // const favoriteBarsData = await fetchFavoriteBarsOfOneUser(userData.id);
        // setUser((prev) => ({ ...prev, favoriteBars: favoriteBarsData }));
  
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
  
    fetchUserData();
  }, []);


 console.log('user', user);
  

  return (
    <>
      <h1 className="bg-secondary light-mode:bg-amber-100 text-light light-mode:text-dark text-center text-3xl font-title font-bold pt-3">Mon profil</h1>
      <div className="container-profil w-full min-h-full flex flex-wrap items-center justify-center bg-secondary light-mode:bg-amber-100 p-2">
        <section className="container-profilCard w-full m-2 xl:w-1/3 md:w-1/3 flex justify-center items-center">
          <ProfilCard user={user} />
        </section>
        <section className="container-commentsAndBars flex flex-col justify-center items-center w-full m-2 xl:w-2/3 md:w-1/2 lg:w-1/2">
          <CommentsCard user={user} />
          <FavoritesBarCard user={user} />
        </section>
        <Modal />

      </div>
    </>
  );
}
