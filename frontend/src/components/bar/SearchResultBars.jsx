import React, { useContext } from 'react';
import { AppContext } from '../../context/context';

const SearchResultBars = () => {
    const { searchResultBars, setSearchResultBars } = useContext(AppContext);

    if (searchResultBars.length === 0) {
        return (
            <div>
                <h2>Aucun bar trouvé</h2>
            </div>
        );
    }

    return (
        <div>
            {searchResultBars.map(bar => (
                <div key={bar.id}>
                    <h2>{bar.name}</h2>
                    <p>{bar.address}</p>
                    <p>{bar.city}</p>
                    <p>{bar.rate}</p>
                    <p>{bar.image}</p>
                </div>
            ))    
            }
        </div>
    );
};

export default SearchResultBars;