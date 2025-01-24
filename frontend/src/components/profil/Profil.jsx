import React from 'react';
import { AppContext } from '../../context/context';

const Profil = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
        </div>
    );
};

export default Profil;