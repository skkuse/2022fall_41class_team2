import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Settings from "./modules/pages/Settings";
import LandingPage from "./modules/pages/Home";
import NotFound from "./modules/pages/NotFound";


const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
