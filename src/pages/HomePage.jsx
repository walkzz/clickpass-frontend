import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import EventList from "../components/EventList";
import Assistant from "../components/Assistant";
import Footer from "../components/Footer";
import '../styles/HomePage.css'
import Search from "../components/Search";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <Toolbar />
        <Search />
        <EventList />
        {/* <div className='horizontal-break'></div> */}
        <Assistant />
        <Footer />
      </div>
    </>
  );
};
export default HomePage;