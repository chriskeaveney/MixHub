import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import { IMAGENAME } from "../image";
import { Button } from "react-native-elements";

import { TextField } from "react-native-material-textfield";

const styles = StyleSheet.create({
  loginButton: {
    color: "white",
    fontSize: 30
  },
  centre: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },
  miniButton: {
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#4b4b4b"
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#E8EAF6"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  loginText: {
    color: "#000"
  },
  welcome: {
    fontSize: 23,
    fontWeight: "bold"
  },
  platform: {
    fontSize: 17,
    marginTop: -12
  }
});

class LandingScreen extends Component {
  static navigationOptions = {
    title: "MixHub",
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#f8f9fa"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.centre}>
          <Text style={styles.welcome}>
            <Text style={styles.red}>Welcome to MixHub{"\n"}</Text>
          </Text>
          <Text style={styles.platform}>
            A platform for trading vinyl records{"\n"}
          </Text>
          <Image
            style={{ width: 250, height: 250, marginBottom: 15 }}
            source={IMAGENAME}
          />
          <View style={styles.fixToText}>
            <Button
              raised
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate("Register")}
              title="   Register   "
              titleColor="white"
            />
            <Text> </Text>
            <Button
              raised
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate("Login")}
              title="     Log in     "
              titleColor="white"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LandingScreen;
