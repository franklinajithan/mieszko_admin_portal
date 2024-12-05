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
//import { subscribeUserToPush } from './pushNotifications';


import { useTranslation } from "react-i18next";
import Header from "./layouts/Header";
import { useDispatch } from "react-redux";
import { getUserById } from "./service/user.service";
import { login } from "./store/slices/authSlice";
import NotificationList from "./components/elements/NotificationList";


export default function App() {
  const Login = React.lazy(() => import('./pages/Signin2'));
  const dispatch = useDispatch();
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
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details with the token



      getUserById("2")
        .then((response) => {
          const user = response.data.data;
          // Dispatch login action to store user and token in Redux
          dispatch(login({ user, token }));
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          // Optionally handle token expiration by removing the token from localStorage
          localStorage.removeItem('token');
        });



    }
  }, [dispatch]);



  const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthRoute><Toaster /> <NotificationList />
              <Header onSkin={setSkin} />
              <Main />
            </AuthRoute>}>
           
              {protectedRoutes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
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
