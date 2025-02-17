import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import Bar from './Bar';

const SearchResultBars = () => {
    const { searchResultBars, setSearchResultBars } = useContext(AppContext);
    console.log('searchResultBars', searchResultBars);
    
    if (!searchResultBars || searchResultBars.length === 0) {
        return (
            <div>
                <h2>Aucun bar trouvé</h2>
            </div>
        );
    }

    return (
        <div className='container-searchResultBars flex flex-col items-center justify-center w-full gap-2'>
            {searchResultBars.map(bar => (
                <Bar key={bar.id} bar={bar} />
            ))    
            }
        </div>
    );
};

export default SearchResultBars;