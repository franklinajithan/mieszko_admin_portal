import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './layouts/Main';
import NotFound from "./pages/NotFound";
import AuthRoute from './helpers/AuthRoute';
import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import { Toaster } from "@/components/ui/toaster"
import "./assets/css/remixicon.css";
import "./scss/style.scss";

import { useTranslation } from "react-i18next";
import Header from "./layouts/Header";
const Login = React.lazy(() => import('./pages/Signin2'));

export default function App() {
  useEffect(() => {
    const handleSkinMode = () => {
      let skinMode = localStorage.getItem("skin-mode");
      let HTMLTag = document.querySelector("html");

      if (skinMode) {
        HTMLTag?.setAttribute("data-skin", skinMode);
      }
    };

    window.addEventListener("load", handleSkinMode);

    // Cleanup event listener
    return () => {
      window.removeEventListener("load", handleSkinMode);
    };
  }, []);
  const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthRoute><Toaster /><Header onSkin={setSkin} /><Main /> </AuthRoute>}>
              {protectedRoutes.map((route, index) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={index}
                />
              ))}
            </Route>

            {publicRoutes.map((route, index) => (
              <Route
                path={route.path}
                element={route.element}
                key={index}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}
