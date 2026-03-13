import '../styles/Toolbar.css'
const Toolbar = ({title = "Find Your Next Experience", subtitle = "Discover concerts, theater, cinema, and opera events."}) => {
  return (
    <header className='toolbar-header'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
    </header>
  );
};
export default Toolbar;