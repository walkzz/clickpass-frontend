import '../styles/EventCard.css'
const EventCard = () => {
  return <div className='event-card-container'>
    <div className='event-card-header'>
      <a href="">
        <div className='event-card-image'>
          <img src="" alt="Echoes of the stage" width={600} height={400}/>
        </div>
      </a>
    </div>
    <div className='event-card-information'>
      <div className='event-type-container'>
        <div className='event-type'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drama h-3.5 w-3.5">
          <path d="M10 11h.01"></path>
          <path d="M14 6h.01"></path>
          <path d="M18 6h.01"></path>
          <path d="M6.5 13.1h.01"></path>
          <path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"></path>
          <path d="M17.4 9.9c-.8.8-2 .8-2.8 0"></path>
          <path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"></path>
          <path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"></path>
          </svg>
          Theater
        </div>
      </div>
      <div className='event-title'>
        <a href="">Echoes of the Stage</a>
      </div>
      <div className='event-details-container'>
        <div className='event-time-container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days h-4 w-4">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="M8 14h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 18h.01"></path>
          <path d="M12 18h.01"></path>
          <path d="M16 18h.01"></path>
          </svg>
          <span>September 15, 2024</span>
        </div>
        <div className='event-location-container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>New York, NY</span>
        </div>
      </div>
    </div>
    <div className='tickets-container'>
      <a className='ticket-button' href="">Get Tickets
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-4 w-4">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
        </svg>
      </a>
    </div>
  </div>;
}
export default EventCard;