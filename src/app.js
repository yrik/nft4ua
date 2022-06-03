import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Art from './Art';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Art />} />
      </Routes>
    </Router>
  );
};

export default App;
