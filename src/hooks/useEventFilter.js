import { useState, useEffect, useCallback } from 'react';

export const useEventFilter = (allEvents = []) => {
  const [displayedEvents, setDisplayedEvents] = useState([]);
  useEffect(() => {
    setDisplayedEvents(allEvents);
  }, [allEvents]);

  const handleSearch = useCallback(({ searchTerm, category, location }) => {
    let filtered = allEvents;

    if (searchTerm) {
      filtered = filtered.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category !== "All") {
      filtered = filtered.filter(e => e.Category === category);
    }
    if (location !== "All") {
      filtered = filtered.filter(e => e.location?.city === location);
    }

    setDisplayedEvents(filtered);
  }, [allEvents]);
  return { displayedEvents, handleSearch };
};