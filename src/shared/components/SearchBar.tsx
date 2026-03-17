import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import SearchModal from './SearchModal';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const handlSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value
    setSearchInput(target);
    setIsModalOpen(target.trim().length > 2); 
  }
 
  const handleModalClose = () => {  //close modal
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={(e)=> e.preventDefault()} className="relative w-full max-w-md mx-auto">
      <div className="relative bg-neutral-100 rounded-md shadow-sm">
        <input
          type="text"
          value={searchInput}
          onChange={handlSearchChange}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              navigate(`/search?q=${encodeURIComponent(searchInput)}`);
              handleModalClose();
            }
          }}
          placeholder="search a product?"
          className="w-full py-2 pl-2 text-sm font-normal outline-none"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2  cursor-pointer hover:text-gray-500"
          aria-label="Search"
        >
          <FaSearch size={14} />
        </button>
      </div>

      {isModalOpen && <SearchModal search={searchInput} onClose={handleModalClose} />}
    </form>
  );
}
export default SearchBar;