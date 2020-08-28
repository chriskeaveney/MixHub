import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

const url = "http://localhost:5000";
// Register User
export const registerUser = userData => dispatch => {
  axios
    .post(
      url + "/api/users/register",
      userData,
      {
        name: userData.name,
        email: userData.email,
        password: userData.password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => this.props.navigation.navigate("Login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  console.log("In login user");
  console.log(userData);
  console.log(userData.email);
  console.log(userData.password);
  axios
    .post(
      url + "/api/users/login",
      {
        email: userData.email,
        password: userData.password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      const { token } = res.data;
      try {
        AsyncStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      } catch (error) {
        // Error saving data
      }
    })
    .catch(err => console.log(err));
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  AsyncStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
