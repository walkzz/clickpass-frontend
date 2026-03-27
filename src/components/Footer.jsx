import '../styles/Footer.css'
import '../styles/Navbar.css'
import { NavLink } from "react-router-dom";
const Footer = () => {
  return <footer>
    <div className='footer-container'>
      <div className='footer-section'>
        <div className='footer-copyright'>
          <p>© 2026 ClickPass. All rights reserved.</p>
        </div>
        <nav className='footer-navigation'>
          <NavLink className={"navigation-button"} to="/home">Home</NavLink>
          <NavLink className={"navigation-button"} to="/about">About</NavLink>
          <NavLink className={"navigation-button"} to="/events">Events</NavLink>
          <NavLink className={"navigation-button"} to="/blogs">Blogs</NavLink>
          <NavLink className={"navigation-button"} to="/contact">Contact</NavLink>
        </nav>
      </div>
    </div>
  </footer>;
};
export default Footer;