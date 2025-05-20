import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login'; // Create a Login component
import SignUp from './SignUp';
import Navbar from './HomeNavbar';
import EventPage from './EventPage';
import Tourpage from './Tourpage';
import AdminHomePage from './AdminHomePage';
import NewsPage from './NewsPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/SignUp" element={<SignUp/>}/>
        <Route path = "/EventPage" element={<EventPage/>}/>
        <Route path = "/Tourpage" element={<Tourpage/>}/>
        <Route path = "/AdminHomePage" element={<AdminHomePage/>}/>
        <Route path = "/NewsPage" element={<NewsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;