import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Main from "./layouts/Main";
import NotFound from "./pages/NotFound";
import AuthRoute from "./helpers/AuthRoute";
import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import { Toaster } from "@/components/ui/toaster";
import Header from "./layouts/Header";
import NotificationList from "./components/elements/NotificationList";

import { getUserById } from "./service/user.service";
import { login } from "./store/slices/authSlice";

import "./assets/css/remixicon.css";
import "./scss/style.scss";

// Lazy-loaded components
const Login = React.lazy(() => import("./pages/Signin2"));

export default function App() {
  const dispatch = useDispatch();

  // Initialize skin mode
  const [skin, setSkin] = useState(
    localStorage.getItem("skin-mode") || "light"
  );

  useEffect(() => {
    // Handle skin mode on page load
    const handleSkinMode = () => {
      const skinMode = localStorage.getItem("skin-mode");
      const HTMLTag = document.querySelector("html");

      if (skinMode) {
        HTMLTag?.setAttribute("data-skin", skinMode);
      }
    };

    window.addEventListener("load", handleSkinMode);

    // Cleanup
    return () => {
      window.removeEventListener("load", handleSkinMode);
    };
  }, []);

  // const requestNotificationPermission = async () => {
  //   const permission = await Notification.requestPermission();
  //  // console.log(permission);

  //   if (permission !== 'granted') {
  //  //   console.log('Permission not granted');
  //   }
  //   else {
  //   //  console.log('Permission granted');
  //     // new Notification('Hello World');
  //   }
  // };

  // useEffect(() => {
  //   requestNotificationPermission();
  //  // subscribeUserToPush();
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserById("2")
        .then((response) => {
          const user = response.data.data;
          dispatch(login({ user, token }));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          localStorage.removeItem("token"); // Remove invalid token
        });
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Toaster />
                  <NotificationList />
                  <Header onSkin={setSkin} />
                  <Main />
                </AuthRoute>
              }
            >
              {protectedRoutes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))}
            </Route>

            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}

            {/* Catch-All Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}
