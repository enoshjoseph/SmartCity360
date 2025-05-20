import React, { useState, useEffect } from "react";
import "./Tourpage.css";
import Navbar from "./Navbar";

function Tourpage() {
  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/destinations");
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        // If the photo data is already in a usable format in the API response,
        // we'll use it directly. Otherwise, we might need to fetch each image separately.
        setDestinations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    if (destinations.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    }
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (destinations.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
      );
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (destinations.length > 0) {
      const interval = setInterval(nextSlide, 7000); // Auto-slide every 7 seconds
      return () => clearInterval(interval);
    }
  }, [destinations]);

  // Method 1: If your API returns a URL to fetch the blob image
  const getImageUrl = (photoId) => {
    if (!photoId) return '/images/default.jpg';
    return `http://localhost:8080/api/destinations/image/${photoId}`;
  };

  // Method 2: If your API returns a base64 encoded image
  const getImageSrc = (photoData) => {
    if (!photoData) return '/images/default.jpg';
    
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
    return '/images/default.jpg';
  };

  if (loading) {
    return (
      <div className="maindiv">
        <Navbar />
        <div className="loading">Loading destinations...</div>
      </div>
    );
  }

  return (
    <div className="maindiv">
      <Navbar />

      {destinations.length > 0 ? (
        <div className="carouseltour">
          <div className="listtour">
            {destinations.map((destination, index) => {
              // Choose the appropriate method based on your API structure
              // If your API returns a URL to access the image
              // const imgSrc = getImageUrl(destination.photoId);
              
              // If your API returns base64 data directly
              const imgSrc = getImageSrc(destination.photo);
              
              return (
                <div
                  key={destination.id || index}
                  className={`item ${index === currentIndex ? "active" : ""}`}
                >
                  <img 
                    src={imgSrc}
                    alt={destination.destinationname || `Destination ${index}`} 
                    onError={(e) => {
                      console.error(`Failed to load image for destination ${destination.id || index}`);
                      e.target.src = '/images/default.jpg'; // Fallback image
                    }}
                  />
                  <div className="contenttour">
                    <div className="authortour">{destination.category || "Category"}</div>
                    <div className="titletour">{destination.place || "Place"}</div>
                    <div className="topictour">{(destination.destinationName || "DestinatoionName").toUpperCase()}</div>
                    <div className="destour">{destination.description || "Description"}</div>
                    <div className="buttonstour">
                      {/*<button>SEE MORE</button>*/}
                      {/*<button>SUBSCRIBE</button>*/}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thumbnail */}
          <div className="thumbnail">
            {destinations.map((destination, index) => {
              // Choose the appropriate method based on your API structure
              // const imgSrc = getImageUrl(destination.photoId);
              const imgSrc = getImageSrc(destination.photo);
              
              return (
                <div
                  key={destination.id || index}
                  className={`item ${index === currentIndex ? "selected" : ""}`}
                >
                  <img 
                    src={imgSrc}
                    alt={`Thumbnail ${index}`}
                    onError={(e) => {
                      e.target.src = '/images/default.jpg'; // Fallback image
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="arrowstour">
            <button className="buttontour" onClick={prevSlide}>
              Prev
            </button>
            <button className="buttontour" onClick={nextSlide}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="no-destinations">No destinations found</div>
      )}
    </div>
  );
}

export default Tourpage;