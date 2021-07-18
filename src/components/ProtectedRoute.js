import React from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "./Footer.js";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <>
            <Component {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="./sign-in" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
