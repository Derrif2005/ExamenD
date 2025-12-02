import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MonetaryStats from './components/MonetaryStats';
import Pools from './components/Pools';

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stats" element={<MonetaryStats />} />
            <Route path="/pools" element={<Pools />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;