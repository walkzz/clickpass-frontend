import '../styles/Navbar.css'
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <header className='header'>
        <div className="header-nav">
          <a className="logo-nav" href="/">
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
          </nav>
          <div className="">
            <a className="" href="/admin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round h-6 w-6"><path d="M18 20a6 6 0 0 0-12 0"></path><circle cx="12" cy="10" r="4"></circle>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              {/* <span className="">Profile</span> */}
            </a>
            {/* <button className="" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«R1ddb»" data-state="closed">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
              <span className="">Open navigation menu</span>
            </button> */}
          </div>
        </div>
    </header>
  );
};
export default Navbar;