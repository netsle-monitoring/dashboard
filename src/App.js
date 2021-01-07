import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./state/actions/user.actions";
import { useEffect } from "react";
import LoadingAnimation from "./pages/loadingAnimation";
import NavBar from "./components/navbar";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const refreshAssets = useSelector((state) => state.refreshToken.loginAssets);
  const refreshStatus = useSelector((state) => state.refreshToken.status);
  const localRefreshToken = localStorage.getItem("refreshToken");
  const localAccessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (refreshStatus === "success") {
      localStorage.setItem("refreshToken", refreshAssets.refreshToken);
      localStorage.setItem("accessToken", refreshAssets.accessToken);
      // localStorage.setItem("accessTokenExpiresOn", refreshAssets.expiresOn);
    } else if (refreshStatus === "error") {
      console.log("There's an error in refresh");
      localStorage.removeItem("refreshToken");
      document.location.href = "/login";
    }
  }, [refreshStatus]);

  let isTokenExpired =
    (localStorage.getItem("accessTokenExpiresOn") <
      new Date().getTime() / 1000 &&
      localStorage.getItem("accessToken") !== null) ||
    isNaN(localStorage.getItem("accessTokenExpiresOn"));

  useEffect(() => {
    if ((isTokenExpired || !localAccessToken) && localRefreshToken) {
      dispatch(refreshToken(localStorage.getItem("refreshToken")));
    }
  }, []);
  if (!localRefreshToken) return <Redirect to="/login" />;

  if (refreshStatus !== "success" && isTokenExpired) {
    return <LoadingAnimation />;
  }
  console.log(refreshStatus, isTokenExpired);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isTokenExpired || refreshStatus === "success" ? ( // check whether the access token is expired (that means we're fucked.)
          <Component {...props} />
        ) : (
          <Redirect to="/login/" />
        )
      }
    />
  );
};

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exactly component={LoginPage} />
          <Route path="/">
            <div class="flex flex-col h-screen">
              <NavBar />
              <PrivateRoute exactly path="/" component={HomePage} />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
