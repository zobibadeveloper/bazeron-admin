import { Redirect, Route, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

export default function RedirectIfAuth({isAuthenticated, isInitialized, children, ...rest}) {
  const { state } = useLocation();
  
  const from = state?.from ? state.from : "/";

  if (isAuthenticated === true) {
    return <Route {...rest} render={() => <Redirect to={from} />} />;
  }

  if (isAuthenticated === false && isInitialized === false) {
    return <Spinner />;
  }

  return <Route {...rest} render={() => children} />;
}
