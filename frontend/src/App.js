// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';

function App() {
  return (
    <Router>
      <div style={{ margin: '20px' }}>
        <h1>US Real Estate Platform</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
