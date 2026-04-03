import useRandomEvent from '../hooks/useRandomEvent';
import '../styles/Assistant.css'
const Assistant = ({ events = [] }) => {
  const { goToRandomEvent } = useRandomEvent(events);
  
  return <div className="assistant-section">
    <div className='assistant-container'>
      <div className='assistant-details'>
        <div className='assistant-info'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
          <path d="m14 7 3 3"></path>
          <path d="M5 6v4"></path>
          <path d="M19 14v4"></path>
          <path d="M10 2v2"></path>
          <path d="M7 8H3"></path>
          <path d="M21 16h-4"></path>
          <path d="M11 3H9"></path>
          </svg>
          Personalized For You
        </div>
      </div>
      <div className='assistant-suggestions'>
        <p>
          Let our AI assistant suggest events you might love based on your interests.
        </p>
        <button 
        className='assistant-button'
        onClick={goToRandomEvent}
        disabled={events.length === 0}>
          Get AI Recommendations
        </button>
      </div>
    </div>
  </div>;
};
export default Assistant;