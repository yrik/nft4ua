import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Art from './Art';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/art" element={<Art />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
