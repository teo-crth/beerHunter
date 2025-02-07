import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import ProfilCard from "../components/profil/ProfilCard";
import CommentsCard from "../components/profil/CommentsCard";
import FavoritesBarCard from "../components/profil/FavoritesBarCard";
import Modal from "../components/ui/Modal";


import { fetchOneUser } from "../api/user/oneUserCrud";
import { fetchCommentsOfOneUser } from "../api/user_comments/commentsCrud";
import { fetchImagesOfOneComment } from "../api/user_comments/imagesCommentCrud";


export default function Profil() {

  const {
    user,
    setUser,
    openModal
  } = useContext(AppContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchOneUser(2);
        setUser(userData);
  
        const commentsData = await fetchCommentsOfOneUser(userData.id);

        const updatedUserData = { ...userData, comments: [] };

        const commentsWithImages = await Promise.all(
          commentsData.map(async (comment) => {
            const commentImage = await fetchImagesOfOneComment(comment.id);
            return { ...comment, commentImage };
          })
        );

        setUser((prev) => ({ ...updatedUserData, comments: commentsWithImages }));

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
    <div className="container-profilPage min-h-full">
<<<<<<< HEAD
      <h1 className=" light-mode:bg-amber-100 text-light light-mode:text-dark text-center text-3xl font-title font-bold p-5">Mon profil</h1>
=======
      <h1 className=" light-mode:bg-amber-100 text-light light-mode:text-dark text-center text-3xl font-title font-bold p-3">Mon profil</h1>
>>>>>>> fe4e75c490fa862fcc6c9c4c3233652b67dd7f02
      <div className="container-profil w-full min-h-full flex flex-wrap items-center justify-center light-mode:bg-amber-100 p-2 pb-5">
        <section className="container-profilCard w-full m-2 xl:w-1/3 md:w-1/3 flex justify-center items-center">
          <ProfilCard user={user} />
        </section>
        <section className="container-commentsAndBars flex flex-col justify-center items-center w-full m-2 xl:w-2/3 md:w-1/2 lg:w-1/2">
          <CommentsCard user={user} />
          <FavoritesBarCard user={user} />
        </section>
        <Modal />

      </div>
    </div>
  );
}
