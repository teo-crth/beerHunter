import React, { useEffect, useContext } from "react";
import Profil from "../components/profil/Profil";
import { AppContext } from "../context/context";

import fetchOneUser from "../api/user/oneUserCrud";


export default function Profil() {
    const { user, setUser } = useContext(AppContext);
    console.log(user);

useEffect(() => {
    fetchOneUser(user.id)
    .then((data) => {
        setUser(data);
    })
}, [user.id])

  return (
    <>
    <div className="container-profil">
        <h1>Mon profil</h1>
        <Profil user={user}/>
    </div>
    </>
  );
}
