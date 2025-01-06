import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
  },
  // {
  //   path: "/about",
  //   element: (
  //     <>
  //       <Header />
  //       <About />
  //     </>
  //   ),
  // },
  // Ajoutez d'autres routes ici
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);