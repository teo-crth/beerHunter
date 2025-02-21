import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import Bar from './Bar';

const SearchResultBars = () => {
    const { searchResultBars, pastResultBars } = useContext(AppContext);
    
    console.log('result de la recherche', searchResultBars);
    return (
        <>
            <section className='container-searchResultBars flex flex-col items-center justify-center w-full gap-2 mt-5'>
                {!searchResultBars || searchResultBars?.length === 0 ? <h2 className='font-text text-light font-bold text-2xl border-2 border-primary bg-primary rounded-md p-3'>Aucun bar trouvé</h2> :
                    searchResultBars
                    .sort((a, b) => b.rate - a.rate)
                    .map(bar => (
                        <Bar key={bar.id} bar={bar} />
                    )) 
                }
            </section>
            {pastResultBars?.length > 0 && (
                <section className="container-pastResults w-[95%] justify-center items-center flex flex-col gap-2 mt-5">
                <h2 className='font-text text-light light-mode:text-dark-black text-center font-bold text-2xl'>Recherche précédente</h2>
                    <div className='flex items-center justify-start gap-2 w-full overflow-scroll'>
                        {pastResultBars.map(bar => (
                            <Bar key={bar.id} bar={bar} />
                        ))    
                        }
                    </div>
                </section>
            )}
        </>
    );
};

export default SearchResultBars;