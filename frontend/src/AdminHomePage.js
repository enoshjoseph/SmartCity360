import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  BarChart, 
  PlusCircle,
  Globe,
  Edit,
  Trash
} from 'lucide-react';
import './AdminHomePage.css';

const AdminHomePage = () => {
  const [portalStats, setPortalStats] = useState({
    totalUsers: 0,
    destinations: 0,
    events: 0,
  });

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [artistName, setArtistName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const [newDestination, setNewDestination] = useState({
    place: '',
    category: '',
    name: '',
    description: '',
    photo: null,
  });

  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    artist: '',
    duration: '',
    date: '',
    startTime: '',
    photo: null,
  });

  const handleAddDestination = async () => {
    const jsonData = {
      place: newDestination.place,
      category: newDestination.category,
      destinationName: newDestination.name, // Make sure this matches DTO field
      description: newDestination.description,
    };
  
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));
    
    if (newDestination.photo) {
      formData.append("photo", newDestination.photo);
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/destinations/add', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        throw new Error(`Failed with status ${response.status}`);
      }
      const result = await response.text();
      console.log("✅ Event added successfully:", result);
      alert("Event added successfully!");
  
      setShowAddDestinationModal(false);
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  const handleAddEvent = async () => {
    const formData = new FormData();

    const eventData = {
      eventName,
      location: eventLocation,
      artistName,
      duration,
      date,
      time,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(eventData)], { type: "application/json" })
    );
    
    if (selectedFile) {
      formData.append("artistPhoto", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const result = await response.text();
      console.log("✅ Event added successfully:", result);
      alert("Event added successfully!");

      // Reset fields
      setEventName("");
      setEventLocation("");
      setArtistName("");
      setDuration("");
      setDate("");
      setTime("");
      setSelectedFile(null);
      
      // Close the modal
      setShowAddEventModal(false);

    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert("Error adding event: " + error.message);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setPortalStats({
            totalUsers: 15784,
            destinations: 142,
            events: 38,
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const destinations = [
    { id: 1, name: 'Paris, France', category: 'City', addedDate: '2025-03-15' },
    { id: 2, name: 'Santorini, Greece', category: 'Island', addedDate: '2025-03-22' },
    { id: 3, name: 'Kyoto, Japan', category: 'Cultural', addedDate: '2025-03-28' },
    { id: 4, name: 'Machu Picchu, Peru', category: 'Historic', addedDate: '2025-04-01' },
  ];

  const events = [
    { id: 1, name: 'Summer Music Festival', location: 'Barcelona', startDate: '2025-06-15', endDate: '2025-06-20', registrations: 856 },
    { id: 2, name: 'International Food Fair', location: 'New York', startDate: '2025-05-08', endDate: '2025-05-10', registrations: 432 },
    { id: 3, name: 'Cultural Heritage Week', location: 'Istanbul', startDate: '2025-04-22', endDate: '2025-04-28', registrations: 294 },
    { id: 4, name: 'Tech Conference 2025', location: 'Singapore', startDate: '2025-07-10', endDate: '2025-07-12', registrations: 712 }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Globe size={24} />
          <h1 className="sidebar-title">TravelPortal</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active"><BarChart size={20} /><span>Dashboard</span></div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-container">
            <div>
              <h1 className="header-title">Travel Admin Dashboard</h1>
              <p className="header-subtitle">Welcome back, Admin</p>
            </div>

            <div className="header-actions">
            </div>
          </div>
        </header>

        <main className="dashboard-container">
          {isLoading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-info">
                    <p>Total Users</p>
                    <p>{portalStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users size={40} className="icon-blue" />
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <p>Destinations</p>
                    <p>{portalStats.destinations}</p>
                  </div>
                  <MapPin size={40} className="icon-green" />
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <p>Upcoming Events</p>
                    <p>{portalStats.events}</p>
                  </div>
                  <Calendar size={40} className="icon-orange" />
                </div>
              </div>

              {/* Destination Management */}
              <div className="manage-section">
                <div className="section-header">
                  <h2 className="section-title">Travel Destinations</h2>
                  <button className="add-button" onClick={() => setShowAddDestinationModal(true)}>
                    <PlusCircle size={16} />
                    <span>Add Destination</span>
                  </button>
                </div>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Added Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {destinations.map(destination => (
                        <tr key={destination.id}>
                          <td>{destination.name}</td>
                          <td>{destination.category}</td>
                          <td>{destination.addedDate}</td>
                          <td className="action-buttons">
                            <button className="action-btn edit-btn"><Edit size={16} /></button>
                            <button className="action-btn delete-btn"><Trash size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Events Management */}
              <div className="manage-section">
                <div className="section-header">
                  <h2 className="section-title">Latest Events</h2>
                  <button className="add-button" onClick={() => setShowAddEventModal(true)}>
                    <PlusCircle size={16} />
                    <span>Add Event</span>
                  </button>
                </div>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Registrations</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => (
                        <tr key={event.id}>
                          <td>{event.name}</td>
                          <td>{event.location}</td>
                          <td>{event.startDate}</td>
                          <td>{event.endDate}</td>
                          <td>{event.registrations}</td>
                          <td className="action-buttons">
                            <button className="action-btn edit-btn"><Edit size={16} /></button>
                            <button className="action-btn delete-btn"><Trash size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Add Destination Modal */}
      {showAddDestinationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Destination</h3>

            <input 
              type="file" 
              accept="image/*" 
              className="modal-input"
              onChange={(e) => setNewDestination({ ...newDestination, photo: e.target.files[0] })}
            />

            <input 
              type="text" 
              placeholder="Destination Place" 
              className="modal-input" 
              value={newDestination.place}
              onChange={(e) => setNewDestination({ ...newDestination, place: e.target.value })}
            />

            <input 
              type="text" 
              placeholder="Category" 
              className="modal-input"
              value={newDestination.category}
              onChange={(e) => setNewDestination({ ...newDestination, category: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Destination Name" 
              className="modal-input" 
              value={newDestination.name}
              onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
            />
            <textarea 
              placeholder="Description" 
              className="modal-input" 
              rows={4}
              value={newDestination.description}
              onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
            />

            <div className="modal-actions">
              <button 
                onClick={() => setShowAddDestinationModal(false)} 
                className="modal-close-btn"
              >
                Cancel
              </button>
              <button className="modal-save-btn" onClick={handleAddDestination}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <input 
              type="file" 
              accept="image/*" 
              className="modal-input"
              onChange={(e) => setSelectedFile(e.target.files[0])} 
            />

            <input 
              placeholder="Event Name" 
              className="modal-input"
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)}
            />
            <input 
              placeholder="Location" 
              className="modal-input" 
              value={eventLocation} 
              onChange={(e) => setEventLocation(e.target.value)}  
            />

            <input 
              placeholder="Artist Name" 
              className="modal-input" 
              value={artistName} 
              onChange={(e) => setArtistName(e.target.value)} 
            />

            <input 
              placeholder="Duration (e.g. 3 hours)" 
              className="modal-input" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
            />

            <input 
              type="date" 
              className="modal-input" 
              placeholder="Date"
              value={date} 
              onChange={(e) => setDate(e.target.value)}
            />
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Start Time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddEventModal(false)} className="modal-close-btn">Cancel</button>
              <button className="modal-save-btn" onClick={handleAddEvent}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;