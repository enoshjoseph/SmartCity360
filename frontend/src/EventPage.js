import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import './EventPage.css';

const EventPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const listRef = useRef(null);

  // Fetch events data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const showSlider = (type) => {
    if (!listRef.current || events.length === 0) return;
  
    // Disable buttons during transition
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    
    if (nextButton) nextButton.style.pointerEvents = 'none';
    if (prevButton) prevButton.style.pointerEvents = 'none';
  
    setTimeout(() => {
      let itemsList = listRef.current.children;
      if (type === 'next') {
        listRef.current.appendChild(itemsList[0]); // Move first item to last
      } else {
        listRef.current.prepend(itemsList[itemsList.length - 1]); // Move last item to first
      }
  
      setCurrentIndex((prevIndex) =>
        type === 'next' ? (prevIndex + 1) % events.length : (prevIndex - 1 + events.length) % events.length
      );
  
      // Re-enable buttons after delay
      if (nextButton) nextButton.style.pointerEvents = 'auto';
      if (prevButton) prevButton.style.pointerEvents = 'auto';
    }, 500); // 500ms delay before animation happens
  };

  // Helper function to get image source from blob data
  const getImageSrc = (photoData) => {
    if (!photoData) return '/images/default-event.png';
    
    // If photoData is already a base64 string
    if (typeof photoData === 'string') {
      // Check if it's already a complete data URL
      if (photoData.startsWith('data:image')) {
        return photoData;
      }
      // If it's just a base64 string without the prefix
      return `data:image/jpeg;base64,${photoData}`;
    }
    
    // Fallback
    return '/images/default-event.png';
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {events.length > 0 ? (
        <div className={`carousel ${showDetails ? 'showDetail' : ''}`} ref={carouselRef}>
          <div className="list" ref={listRef}>
            {events.map((event, index) => (
              <div className={`item ${index === currentIndex ? 'active' : ''}`} key={event.id || index}>
                <img 
                  src={getImageSrc(event.artistPhoto)} 
                  alt={event.artistName || 'Event Image'} 
                  onError={(e) => {
                    console.error(`Failed to load image for event ${event.id || index}`);
                    e.target.src = '/images/default-event.png'; // Fallback image
                  }}
                />
                <div className="introduce">
                  <div className="titleevent">{event.eventName || 'Event Title'}</div>
                  <div className="topicevent">{event.artistName || 'Artist Name'}</div>
                  {/*<div className="desevent">{event.description}</div>*/}
                  <button className="seeMoreevent" onClick={() => setShowDetails(true)}>SEE MORE &#8599;</button>
                </div>
                <div className="detail">
                  <div className="titleevent">{event.eventName || 'Event Title'}</div>
                  <div className="desevent">{event.description || 'Event description'}</div>
                  <div className="specifications">
                    <div><p>Location</p><p>{event.location || 'TBA'}</p></div>
                    <div><p>Date</p><p>{event.date || 'TBA'}</p></div>
                    <div><p>Duration</p><p>{event.duration || 'TBA'}</p></div>
                    <div><p>Time</p><p>{event.time || 'TBA'}</p></div>
                    {/*<div><p>Controlled</p><p>Touch</p></div>*/}
                  </div>
                  <div className="checkout">
                    {/*<button>CHECKOUT</button>*/}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="arrows">
            <button id="prev" onClick={() => showSlider('prev')}>&lt;</button>
            <button id="next" onClick={() => showSlider('next')}>&gt;</button>
            <button id="back" onClick={() => setShowDetails(false)}>See All &#8599;</button>
          </div>
        </div>
      ) : (
        <div className="no-events">No events found</div>
      )}
    </div>
  );
};

export default EventPage;