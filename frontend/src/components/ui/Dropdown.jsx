import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ beers, selectedBeerId, setSelectedBeerId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectText, setSelectText] = useState('Choisir une bière');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id) => {
    if (id === null) { 
      setSelectText('Toutes');
      setSelectedBeerId();      
    } else {
      setSelectedBeerId(id); 
      setSelectText(beers.find((beer) => beer.id === id).name);
    }

    setIsOpen(false);
    
  };

  return (
    <div className="relative w-full md:w-[35%] lg:w-[35%] border-2 border-primary rounded-lg">
        <button
            type='button'
            className="bg-transparent text-center text-md relative w-full flex justify-center items-center gap-1 p-2 whitespace-nowrap"
            onClick={toggleDropdown}
        >
          {selectText}
          <FaChevronDown className={`transform ${isOpen ? 'rotate-180 flex mt-1' : 'flex  mt-1'}`} />
        </button>
        
        {isOpen && (
            <ul className="w-full bg-dark-black light-mode:bg-white border-2 border-primary rounded-lg shadow-lg z-10 overflow-scroll max-h-40 top-9 absolute">
                <li key="toutes" className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSelect(null)}>Toutes</li>
            {beers.map((beer) => (
                <li
                key={beer.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(beer.id)}
                >
                {beer.name}
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};

export default Dropdown;