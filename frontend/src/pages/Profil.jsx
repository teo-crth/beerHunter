import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import ProfilCard from "../components/profil/ProfilCard";
import Modal from "../components/ui/Modal";


import { fetchOneUser } from "../api/user/oneUserCrud";


export default function Profil() {

  const {
    user,
    setUser,
    openModal
  } = useContext(AppContext);

  useEffect(() => {
    fetchOneUser(4)
      .then((data) => {
        setUser(data);
      })
  }, []);

  return (
    <>
      <div className="container-profil w-full min-h-full flex flex-col items-center bg-secondary light-mode:bg-amber-100 p-2">
        <h1 className="text-light light-mode:text-dark text-3xl font-title font-bold m-2">Mon profil</h1>
        <ProfilCard user={user} />
        <Modal />

      </div>
    </>
  );
}
