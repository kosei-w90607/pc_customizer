import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './components/pages/TopPage';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TopPage />} />
      {/* 他のルートもここに追加 */}
    </Routes>
  </Router>
);

export default AppRoutes;
