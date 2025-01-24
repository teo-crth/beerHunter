import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import ProfilCard from "../components/profil/ProfilCard";

import { fetchOneUser } from "../api/user/oneUserCrud";


export default function Profil() {
    const { user, setUser } = useContext(AppContext);

useEffect(() => {
    fetchOneUser(3)
    .then((data) => {
        setUser(data);
    })
}, []);

  return (
    <>
    <div className="container-profil w-full h-full flex flex-col items-center bg-secondary p-2">
      <h1 className="text-light light-mode:text-dark text-3xl font-title">Mon profil</h1>
      <ProfilCard user={user} />
    </div>
    </>
  );
}
