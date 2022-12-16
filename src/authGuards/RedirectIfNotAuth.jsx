import { Redirect, Route, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

export default function RedirectIfNotAuth({ isAuthenticated, isInitialized, children, ...rest }) {
  
  if ((isInitialized === false && isAuthenticated === false)) {
    return <Spinner />;
  }

  if (isInitialized === true && isAuthenticated === false) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
        }}
      />
    );
  }

  return <Route {...rest} render={() => children} />;
}
