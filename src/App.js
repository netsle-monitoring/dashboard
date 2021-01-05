import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import {useDispatch, useSelector} from 'react-redux';
import { refreshToken } from "./state/actions/user.actions";
import { useEffect } from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const refreshAssets = useSelector((state) => state.refreshToken.loginAssets);
  const refreshStatus = useSelector((state) => state.refreshToken.status);
  const localRefreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    console.log("YO BRO", refreshStatus);
    if (refreshStatus === "success") {
      localStorage.setItem("refreshToken", refreshAssets.refreshToken);
      localStorage.setItem("accessToken", refreshAssets.accessToken);
      localStorage.setItem("accessTokenExpiresOn", refreshAssets.expiresOn);

    } else if (refreshStatus === "error") {
      console.log("There's an error in refresh");
      document.location.href = "/login";
    }
  }, [refreshStatus]);

  let isTokenExpired = (localStorage.getItem("accessTokenExpiresOn") < new Date().getTime() / 1000) && (localStorage.getItem("accessToken") !== null) 
  useEffect(() => {
    if (isTokenExpired && localRefreshToken) {
      dispatch(refreshToken(localStorage.getItem("refreshToken")));
    }
  }, []);
  console.log("Token expired?", isTokenExpired);
  if (!localRefreshToken) return <Redirect to="/login"/>;


  if (refreshStatus !== "success" && isTokenExpired) {
    return <div>Bitch I'm refreshing your token!</div>
  }

  return <Route
    {...rest}
    render={(props) =>
      !isTokenExpired || refreshStatus === "success" ? ( // check whether the access token is expired (that means we're fucked.)
        <Component {...props} />
      ) : (
        <Redirect to="/login/" />
      )
    }
  />;
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
