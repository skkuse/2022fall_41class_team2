import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { SettingPage } from "./pages/SettingPage/SettingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { LoginRedirectPage } from "./pages/LoginPage/LoginRedirectPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { AuthProvider, PrivateRoute, LoginRoute } from "./service/AuthProvider";
import { EditorPage } from "./pages/EditorPage/EditorPage";

const CodingCatRoutes = () => {
  return (
    // UI Develeopment
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/settings" element={<SettingPage />} />
    //     <Route path="/auth/login" element={<LoginPage />} />
    //     <Route path="/auth/github" element={<LoginRedirectPage />} />
    //     <Route path="main" element={<MainPage />} />
    //     <Route path="*" element={<NotFoundPage />} />
    //   </Routes>
    // </Router>

    // OAuth2.0 in progress
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/" element={<PrivateRoute />} >
              <Route path="/main" element={<MainPage />} />
              <Route path="editor/lecture/:lecture_id" element={<EditorPage />} />
            <Route path="/settings" element={<SettingPage />} />
          </Route>

          <Route path="/auth" element={<LoginRoute />} >
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/github" element={<LoginRedirectPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default CodingCatRoutes;
