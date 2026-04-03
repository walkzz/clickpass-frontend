import { useNavigate } from 'react-router-dom';
 
const useRandomEvent = (events = []) => {
  const navigate = useNavigate();
 
  const goToRandomEvent = () => {
    if (events.length === 0) return;
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    navigate(`/events/${randomEvent._id}`);
  };
 
  return { goToRandomEvent };
};

export default useRandomEvent;