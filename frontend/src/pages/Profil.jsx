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
    <div className="container-profil w-full h-full flex flex-col items-center bg-secondary">
      <h1>Mon profil</h1>
      <ProfilCard user={user} />
    </div>
    </>
  );
}
