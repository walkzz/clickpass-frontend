import '../styles/Search.css'
import Dropdown from './Dropdown';
const Search = () => {
  return <div className='search-bar'>
    <div className='search-wrapper'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input type="text" placeholder="Search by event name..." />
    </div>
    <div className='dropdown-container'>
      <Dropdown />
      <Dropdown />
    </div>
  </div>;
};
export default Search;