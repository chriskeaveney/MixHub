import React, { Component } from 'react';
import { ScrollView, Picker, Text, View, SafeAreaView, Button, StyleSheet, Platform, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { logoutUser } from "../../actions/authActions";
import { Header } from 'react-native-elements';

let styles = {
  miniButton: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'red',
    marginRight: 10,
    marginTop: 5,
    width: 80,
    position: 'absolute',
      top: 0,
      left: 275,
      right: 0,
      zIndex: 1,
  },
  logoutText: {
    color: 'red',
  },
  header: {
    flexWrap: "wrap",
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f8f9fa',
    position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
  },
  headerTitle: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },

  scroll: {
    backgroundColor: 'transparent',
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 13,
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#007bff'
  },
  addNew: {
    fontSize: 18,
    textAlign: 'center'
  },
  loginText: {
    color: '#007bff'
  }
};

class EditRecordScreen extends React.Component {
  constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.onChangeRecordTitle = this.onChangeRecordTitle.bind(this);
      this.onChangeRecordArtist = this.onChangeRecordArtist.bind(this);
      this.onChangeRecordDescription = this.onChangeRecordDescription.bind(this);
      this.onChangeRecordPrice = this.onChangeRecordPrice.bind(this);
      this.onChangeRecordGenre = this.onChangeRecordGenre.bind(this);
      this.onChangeRecordSize = this.onChangeRecordSize.bind(this);
      this.onChangeRecordType = this.onChangeRecordType.bind(this);
      this.onChangeRecordImage = this.onChangeRecordImage.bind(this);

      const { navigation } = this.props;

      this.state = {
        secureTextEntry: true,
        record_title: '',
        record_artist: '',
        record_description: '',
        record_price: '',
        record_genre:'',
        record_size: '',
        record_type: '',
        record_image: '',
        _id : navigation.getParam('_id')
      };
    }

    componentDidMount() {
    axios.get('http://localhost:5000/records/'+this.state._id)
      .then(response => {
        console.log(response);
          this.setState({
            record_title: response.data.record_title,
            record_artist: response.data.record_artist,
            record_description: response.data.record_description,
            record_price: response.data.record_price,
            record_genre: response.data.record_genre,
            record_size: response.data.record_size,
            record_type: response.data.record_type,
            record_image: response.data.record_image
          })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  onChangeRecordTitle(e) {
    this.setState ({
        record_title: e
    });
  }

  onChangeRecordArtist(e) {
    this.setState ({
        record_artist: e
    });
  }

  onChangeRecordDescription(e) {
    this.setState ({
        record_description: e
    });
  }

  onChangeRecordPrice(e) {
    this.setState ({
        record_price: e
    });
  }

  onChangeRecordGenre(e) {
    this.setState ({
        record_genre: e
    });
  }

  onChangeRecordSize(e) {
    this.setState ({
        record_size: e
    });
  }

  onChangeRecordType(e) {
    this.setState ({
        record_type: e
    });
  }

  onChangeRecordImage(e) {
    this.setState ({
        record_image: e
    });
  }

  handleFileUpload = (event) => {
    console.log(event);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/files', data).then((response) => {
      console.log(response); // do something with the response
      //if response message is fail replace with generic image
      const message = response.data.message;
      if (message==="Fail") {
        this.setState ({
            record_image: "blank.jpg"
        });
      } else {
        this.setState ({
            record_image: response.data.message
        });
      }

    });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onSubmit = e => {
    e.preventDefault();

    console.log(`Form submitted: `);
    console.log(`Record Title: ${this.state.record_title}`);
    console.log(`Record Artist: ${this.state.record_artist}`);
    console.log(`Record Decription: ${this.state.record_description}`);
    console.log(`Record Price: ${this.state.record_price}`);
    console.log(`Record Genre: ${this.state.record_genre}`);
    console.log(`Record Size: ${this.state.record_size}`);
    console.log(`Record Type: ${this.state.record_type}`);
    console.log(`Record Image: ${this.state.record_image}`);
    console.log(this.props.auth);

    const obj = {
      record_title: this.state.record_title,
      record_artist: this.state.record_artist,
      record_description: this.state.record_description,
      record_price: this.state.record_price,
      record_genre: this.state.record_genre,
      record_size: this.state.record_size,
      record_type: this.state.record_type,
      record_image: this.state.record_image,
      record_owner: this.props.auth.user.id
    }

    axios.post('http://localhost:5000/records/update/'+this.state._id, obj)
      .then(res => console.log(res.data));

    this.props.navigation.navigate('AuthLoading');
  };

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    return (
      <MaterialIcon
        size={24}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  onLogoutClick = e => {
    console.log(e);
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  };

  render() {
    if (this.props.auth.isAuthenticated) {
    // console.log(this.props.auth.isAuthenticated);
    let { errors = {}, secureTextEntry, ...data } = this.state;

    console.log(this.state.record_title);

    let title = 'hello';

    if (this.state.record_title!=null) {
      title = this.state.record_title;
      console.log("Title: " + title);

    }
    return(
      <SafeAreaView style={styles.safeContainer}>
      <Header
      leftContainerStyle={{
        backgroundColor: '#f8f9fa',
        marginBottom: 25
      }}
      rightContainerStyle={{
        backgroundColor: '#f8f9fa',
        marginBottom: 25
      }}
      centerContainerStyle={{
        backgroundColor: '#f8f9fa',
        marginBottom: 25
      }}
      containerStyle={{
        backgroundColor: '#f8f9fa',
        height: 60
      }}
   leftComponent={{
      icon: 'menu',
      color: 'black',
      size: 25,
      onPress: () => this.props.navigation.navigate('CreateRecord')
    }}
   centerComponent={{
     text: 'MixHub',
     style: { color: 'black', fontSize: 20 },
     onPress: () => this.props.navigation.navigate('RecordListScreen')
   }}
   rightComponent={{
     icon: 'person',
     color: 'black',
     size: 25,
     onPress: (e) => this.onLogoutClick(e)
   }}
 />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
          >
          <View style={styles.container}>
           <Text style={styles.addNew}>Edit This Record</Text>
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             value={this.state.record_title}
             returnKeyType='next'
             onChangeText={this.onChangeRecordTitle}
             label='Title'
            />
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
            onChangeText={this.onChangeRecordArtist}
            label='Artist'
            />
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
             error={errors.record_description}
             onChangeText={this.onChangeRecordDescription}
             label='Description'
           />
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
             onChangeText={this.onChangeRecordPrice}
             label='Price'
           />
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
             onChangeText={this.onChangeRecordGenre}
             label='Genre'
           />
           <TextField
             autoCorrect={false}
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
             onChangeText={this.onChangeRecordSize}
             label='Size'
           />

           <Picker
              selectedValue={this.state.record_type}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({record_type: itemValue})
              }>
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="Full Album" value="Full Album" />
              <Picker.Item label="EP" value="EP" />
              <Picker.Item label="LP" value="LP" />
           </Picker>

           <TextField
             enablesReturnKeyAutomatically={true}
             returnKeyType='next'
             onChangeText={this.onChangeRecordImage}
             label='Image'
           />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={(e) => this.onSubmit(e)}
              name='submit'
              color={TextField.defaultProps.tintColor}
              titleColor='white'
              >
              <Text style={styles.loginText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
 }
 }

EditRecordScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(EditRecordScreen);
