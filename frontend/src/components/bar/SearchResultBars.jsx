import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import Bar from './Bar';

const SearchResultBars = () => {
    const { searchResultBars, setSearchResultBars, pastResultBars } = useContext(AppContext);
    console.log('searchResultBars', searchResultBars);
    
    if (!searchResultBars || searchResultBars.length === 0) {
        return (
            <>
                <section className='m-5 p-5 border-2 border-primary rounded-lg'>
                    <h2 className='font-text text-primary font-bold text-2xl'>Aucun bar trouvé</h2>
                </section>
                <section className="container-pastResults">
                    <h2 className='font-text text-primary font-bold text-2xl'>Résultats précédents</h2>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        {pastResultBars.map(bar => (
                            <Bar key={bar.id} bar={bar} />
                        ))    
                        }
                    </div>
                </section>
            </>
        );
    }

    return (
        <section className='container-searchResultBars flex flex-col items-center justify-center w-full gap-2'>
            {searchResultBars.map(bar => (
                <Bar key={bar.id} bar={bar} />
            ))    
            }
        </section>
    );
};

export default SearchResultBars;