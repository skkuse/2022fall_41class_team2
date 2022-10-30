import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {LandingPage} from './pages/LandingPage/LandingPage'
import {NotFoundPage} from './pages/NotFoundPage/NotFoundPage'
import {SettingPage} from './pages/SettingPage/SettingPage'
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { LoginRedirectPage } from "./pages/LoginPage/LoginRedirectPage";

import { AuthProvider, PrivateRoute, LoginRoute } from "./service/AuthProvider";

const ProjectRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<LandingPage />} />
            <Route path="/settings" element={<SettingPage />} />
          </Route>


          <Route path="/login" element={<LoginRoute />} >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/redirect" element={<LoginRedirectPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Router>
    </AuthProvider>

  );
};

export default ProjectRoutes;
