import '../styles/Navbar.css'
import { NavLink } from "react-router-dom";
import UserProfileDropdown from './ProfileDropDown';
const Navbar = () => {
  return (
    <header className='header'>
        <div className="header-nav">
          <a className="logo-nav" href="/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer-click h-6 w-6 text-primary">
              <path d="M14 4.1 12 6"></path><path d="m5.1 8-2.9-.8"></path>
              <path d="m6 12-1.9 2"></path><path d="M7.2 2.2 8 5.1"></path>
              <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path>
            </svg>
            <span className="logo-text">ClickPass</span>
          </a>
          <nav className="navigation-links">
            <NavLink className={"navigation-button"} to="/home">Home</NavLink>
            <NavLink className={"navigation-button"} to="/about">About</NavLink>
            <NavLink className={"navigation-button"} to="/events">Events</NavLink>
            <NavLink className={"navigation-button"} to="/blogs">Blogs</NavLink>
            <NavLink className={"navigation-button"} to="/contact">Contact</NavLink>
            {/* <NavLink className={"navigation-button"} to="/login">Login</NavLink>
            <NavLink className={"navigation-button"} to="/register">Register</NavLink> */}
          </nav>
          <UserProfileDropdown />
        </div>
    </header>
  );
};
export default Navbar;