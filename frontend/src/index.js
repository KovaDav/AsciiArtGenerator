import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import PdfDownloaderPage from "./Pages/PdfDownloaderPage"
import PlayAroundPage from "./Pages/PlayAroundPage"
import LandingPage from "./Pages/LandingPage"
import ProfilePage from "./Pages/ProfilePage"
import {KindeProvider} from "@kinde-oss/kinde-auth-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/pdf",
        element: <PdfDownloaderPage />,
      },
      {
        path: "/playaround",
        element: <PlayAroundPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      }
  ]
      },
    ],
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <KindeProvider
		clientId={process.env.REACT_APP_KINDE_CLIENT_ID}
		domain={process.env.REACT_APP_KINDE_ISSUER_URL}
		redirectUri={process.env.REACT_APP_KINDE_POST_CALLBACK_URL}
		logoutUri={process.env.REACT_APP_KINDE_POST_LOGOUT_REDIRECT_URL}
	>
    <RouterProvider router={router} />
    </KindeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
