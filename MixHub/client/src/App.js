/**
 * @Date:   2019-10-31T13:14:34+00:00
 * @Last modified time: 2019-11-19T12:34:01+00:00
 */
import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
//import Landing from "./components/layout/Landing";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
 import PrivateRoute from "./components/private-route/PrivateRoute";
// import RecordList from "./components/dashboard/RecordList";
 import NavBar from "./components/layout/NavBar";
// import CreateRecord from "./components/pages/CreateRecord";
// import EditRecord from "./components/pages/EditRecord";
// import ViewProfile from "./components/pages/ViewProfile";
// import ViewRecord from "./components/pages/ViewRecord";
// import About from "./components/pages/About";
// import Discover from "./components/pages/lastfm/Discover";

const Landing = React.lazy(() => import('./components/layout/Landing'));
const Register = React.lazy(() => import('./components/auth/Register'));
const Login = React.lazy(() => import('./components/auth/Login'));
const RecordList = React.lazy(() => import('./components/dashboard/RecordList'));
const CreateRecord = React.lazy(() => import('./components/pages/CreateRecord'));
const EditRecord = React.lazy(() => import('./components/pages/EditRecord'));
const ViewProfile = React.lazy(() => import('./components/pages/ViewProfile'));
const ViewRecord = React.lazy(() => import('./components/pages/ViewRecord'));
const About = React.lazy(() => import('./components/pages/About'));
const Discover = React.lazy(() => import('./components/pages/lastfm/Discover'));
const MapContainer = React.lazy(() => import('./components/pages/MapContainer'));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="App">
            <Suspense fallback={<div class="loader"></div>}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={RecordList} />
              <PrivateRoute exact path="/edit/:id" component={EditRecord} />
              <PrivateRoute exact path="/delete/:id" component={ViewProfile} />

              <PrivateRoute exact path="/CreateRecord" component={CreateRecord} />
              <PrivateRoute exact path="/ViewProfile/:id" component={ViewProfile} />
              <PrivateRoute exact path="/ViewRecord/:id" component={ViewRecord} />
              <PrivateRoute exact path="/About" component={About} />
              <PrivateRoute exact path="/Discover" component={Discover} />
              <PrivateRoute exact path="/MapContainer" component={MapContainer} />
            </Switch>
            </Suspense>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
