import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import store from "../../store";
import {
  ScrollView,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";
import { RaisedTextButton } from "react-native-material-buttons";
import { TextField } from "react-native-material-textfield";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

let styles = {
  scroll: {
    backgroundColor: "transparent"
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 10 }),
    flex: 1,
    padding: 10
  },

  contentContainer: {
    padding: 8
  },

  buttonContainer: {
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  safeContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    padding: 13,
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#007bff"
  },
  miniButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#007bff"
  },
  loginBelow: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10
  }
};

class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitPassword2 = this.onSubmitPassword2.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.nameRef = this.updateRef.bind(this, "name");
    this.emailRef = this.updateRef.bind(this, "email");
    this.passwordRef = this.updateRef.bind(this, "password");
    this.password2Ref = this.updateRef.bind(this, "password2");

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      secureTextEntry: true,
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let title in errors) {
      let ref = this[title];

      if (ref && ref.isFocused()) {
        delete errors[title];
      }
    }

    this.setState({ errors });
  }

  onChangeText(e) {
    ["name", "email", "password", "password2"]
      .map(title => ({ title, ref: this[title] }))
      .forEach(({ title, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [title]: e });
        }
      });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }));
  }

  onSubmitName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password2.blur();
  }

  onSubmitPassword2() {
    this.password2.blur();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  setEmail = e => {
    this.setState({ email: e });
  };

  setPassword = e => {
    this.setState({ password: e });
  };

  setPassword2 = e => {
    this.setState({ password2: e });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser);

    let errors = {};

    ["name", "email", "password", "password2"].forEach(title => {
      let value = this[title].value();

      if (!value) {
        errors[title] = "Should not be empty";
      } else {
        if ("password" === title && value.length < 6) {
          errors[title] = "Too short";
        }
      }
    });

    this.setState({ errors });

    this.props.navigation.navigate("Login");
  };

  updateRef(email, ref) {
    this[email] = ref;
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let password = secureTextEntry ? "visibility" : "visibility-off";

    return (
      <MaterialIcon
        size={24}
        //name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;

    // let defaultEmail = `${name || 'name'}@${lastname || 'house'}.com`
    //   .replace(/\s+/g, '_')
    //   .toLowerCase();

    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.loginBelow}>Sign up below</Text>
            <TextField
              ref={this.nameRef}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitFirstName}
              returnKeyType="next"
              label="Full Name"
              error={errors.name}
            />

            <TextField
              style={styles.inputStyle}
              ref={this.emailRef}
              defaultValue=""
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType="next"
              label="Email Address"
              error={errors.email}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />

            <TextField
              ref={this.passwordRef}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType="done"
              label="Password"
              error={errors.password}
              title="Choose wisely"
              maxLength={30}
              characterRestriction={20}
              renderRightAccessory={this.renderPasswordAccessory}
            />

            <TextField
              ref={this.password2Ref}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword2}
              returnKeyType="done"
              label="Confirm Password"
              error={errors.password2}
              title="Choose wisely"
              maxLength={30}
              characterRestriction={20}
              renderRightAccessory={this.renderPasswordAccessory}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              raised
              style={styles.loginButton}
              onPress={e => this.onSubmit(e)}
              title="        Sign up        "
              color={TextField.defaultProps.tintColor}
              titleColor="white"
            />
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              Already have an account?{"\n"}
            </Text>
            <TouchableOpacity
              color="grey"
              style={styles.miniButton}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
RegisterScreen.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterScreen);
