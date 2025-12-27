import '../styles/Footer.css'
const Footer = () => {
  return <footer>
    <div className='footer-container'>
      <div className='footer-section'>
        <div className='footer-copyright'>
          <p>© 2025 ClickPass. All rights reserved.</p>
        </div>
        <nav className='footer-navigation'>
          <a className='footer-link' href="">Home</a>
          <a className='footer-link' href="">About</a>
          <a className='footer-link' href="">Events</a>
          <a className='footer-link' href="">Blogs</a>
          <a className='footer-link' href="">Contact</a>
        </nav>
      </div>
    </div>
  </footer>;
};
export default Footer;