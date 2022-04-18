import React from "react";
import { Link, useRoutes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Navbar } from "./Navbar/Navbar";

// import { renderRoutes } from 'react-router-config';
import routes from "./routes";

import "../assets/scss/devstyles.scss";

export const App = () => {
  const element = useRoutes(routes);
  return (
    <>
      <ToastProvider autoDismissTimeout="800" placement="top-left">
        <Navbar />
      {/* <div className="body">
        <Link to="/">home</Link> | <Link to="/post">Post</Link> |{" "}
        <Link to="/counter">Counter</Link> */}
        <div>{element}</div>
      {/* </div> */}
      </ToastProvider>
    </>

  );
};
