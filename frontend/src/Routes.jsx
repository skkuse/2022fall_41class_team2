import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {LandingPage} from './modules/pages/LandingPage/LandingPage'
import {NotFoundPage} from './modules/pages/NotFoundPage/NotFoundPage'
import {SettingPage} from './modules/pages/SettingPage/SettingPage'

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
