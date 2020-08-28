import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from "react-native";
import LandingScreen from "./components/Landing";
import AboutScreen from "./components/pages/About";
import CreateRecordScreen from "./components/pages/CreateRecord";
import ViewRecordScreen from "./components/pages/ViewRecord";
import EditRecordScreen from "./components/pages/EditRecord";
import LoginScreen from "./components/auth/Login";
import RegisterScreen from "./components/auth/Register";
import RecordListScreen from "./components/dashboard/RecordList";
import MapContainerScreen from "./components/pages/MapContainer";
import "react-native-gesture-handler";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Input } from "react-native-elements";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  setUserLoading
} from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { AsyncStorage } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { Ionicons } from "react-native-ionicons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

// Check for token to keep user logged in
if (AsyncStorage.jwtToken) {
  // Set auth token header auth
  const token = AsyncStorage.jwtToken;
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
    //window.location.href = "./login";
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: 20
  },
  signUpText: {
    marginTop: 75
  },
  loginBelow: {
    fontWeight: "bold",
    fontSize: 30
  },
  loginButton: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createBottomTabNavigator(
  {
    RecordListScreen: {
      screen: RecordListScreen,
      navigationOptions: {
        tabBarLabel: ({ focused, tintColor: color }) => (
          <Icon
            name="home"
            type="font-awesome"
            size={25}
            color={color}
            style={{ marginLeft: 45, marginBottom: 10 }}
          />
        )
      }
    },
    CreateRecord: {
      screen: CreateRecordScreen,
      navigationOptions: {
        tabBarLabel: ({ focused, tintColor: color }) => (
          <Icon
            name="plus-square"
            type="font-awesome"
            size={25}
            color={color}
            style={{ marginLeft: 45, marginBottom: 10 }}
          />
        )
      }
    },
    AboutScreen: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarLabel: ({ focused, tintColor: color }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={25}
            color={color}
            style={{ marginLeft: 45, marginBottom: 10 }}
          />
        )
      }
    }
  },
  {
    initialRouteName: "RecordListScreen",
    style: {
      backgroundColor: "#000"
    }
  }
);

const AuthStack = createStackNavigator({
  Landing: LandingScreen,
  Login: LoginScreen,
  Register: RegisterScreen
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    ViewRecord: ViewRecordScreen,
    EditRecord: EditRecordScreen
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(RootStack);
