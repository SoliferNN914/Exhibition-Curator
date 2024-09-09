import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import UserExhibitions from './Components/UserExhibitions';
import UserProfile from './Components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/exhibition' element={<UserExhibitions/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
