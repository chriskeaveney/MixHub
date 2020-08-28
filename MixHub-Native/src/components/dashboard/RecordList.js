import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  Linking,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  ScrollView
} from "react-native";
import "react-native-gesture-handler";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ViewRecordScreen from "../../components/pages/ViewRecord";
import { SearchBar, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

let styles = {
  miniButton: {
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "red",
    marginRight: 10,
    marginTop: 5,
    width: 80,
    position: "absolute",
    top: 0,
    left: 275,
    right: 0,
    zIndex: 1
  },
  loginText: {
    color: "red"
  },
  header: {
    flexWrap: "wrap",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f8f9fa",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  headerTitle: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  scrollView: {
    backgroundColor: "#fff",
    marginHorizontal: 20
  },
  artist: {
    marginTop: 10,
    fontWeight: "bold"
  }
};

class Record extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  onPressed = e => {
    console.log(this.props);
    console.log(this.props.obj);
    console.log(this.props.obj.navigation);
    //this.props.obj.navigation.navigate("Auth");

    this.props.obj.navigation.navigate("ViewRecord", {
      _id: this.props.record._id
    });
  };

  render() {
    console.log(this.props.record.record_image);
    if (
      this.props.record.record_image != null &&
      this.props.record.record_artist != null &&
      this.props.record.record_title != null
    ) {
      console.log(this.props.record.record_image);
      return (
        <View>
          <TouchableOpacity onPress={e => this.onPressed(e)}>
            <Image
              style={{
                width: 230,
                height: 230,
                alignSelf: "center",
                marginTop: 25
              }}
              source={{
                uri: `http://localhost:5000/uploads/${
                  this.props.record.record_image
                }`
              }}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, flexDirection: "column", alignSelf: "center" }}
          >
            <Text style={styles.artist}>{this.props.record.record_artist}</Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "column", alignSelf: "center" }}
          >
            <Text>
              {this.props.record.record_title}
              {"\n"}
            </Text>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const url = "http://localhost:5000";

class RecordListScreen extends Component {
  Post = e => {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    fetch("http://localhost:5000/", {
      method: "POST",
      body: formData
    }).then(r => {
      console.log(r);
    });

    document
      .getElementById("img")
      .setAttribute("src", `http://localhost:5000/${file[0].name}`);
    console.log(file[0]);
  };

  onLogoutClick = e => {
    console.log(e);
    this.props.logoutUser();
    this.props.navigation.navigate("Auth");
  };

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      search: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/records/")
      .then(response => {
        this.setState({ records: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  recordList() {
    var search = this.state.search;
    var filteredRecords = this.state.records;
    if (search !== "") {
      filteredRecords = this.state.records.filter(records => {
        //does the title contain the search term
        return records.record_title.toLowerCase().indexOf(search) !== -1;
      });
    }
    var props = this.props;
    return filteredRecords.reverse().map(function(currentRecord, i) {
      console.log(currentRecord);
      return <Record record={currentRecord} obj={props} key={i} />;
    });
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    let recordList = [];
    if (this.state.records[0] !== undefined) {
      recordList = this.recordList();
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Header
          leftContainerStyle={{
            backgroundColor: "#f8f9fa",
            marginBottom: 25
          }}
          rightContainerStyle={{
            backgroundColor: "#f8f9fa",
            marginBottom: 25
          }}
          centerContainerStyle={{
            backgroundColor: "#f8f9fa",
            marginBottom: 25
          }}
          containerStyle={{
            backgroundColor: "#f8f9fa",
            height: 60
          }}
          leftComponent={{
            icon: "menu",
            color: "black",
            size: 25,
            onPress: () => this.props.navigation.navigate("CreateRecord")
          }}
          centerComponent={{
            text: "MixHub",
            style: { color: "black", fontSize: 20 },
            onPress: () => this.props.navigation.navigate("RecordListScreen")
          }}
          rightComponent={{
            icon: "person",
            color: "black",
            size: 25,
            onPress: e => this.onLogoutClick(e)
          }}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <SearchBar
              containerStyle={{
                marginTop: 20,
                backgroundColor: "#f8f9fa",
                height: 60,
                borderWidth: 0
              }}
              inputStyle={{
                backgroundColor: "#fff"
              }}
              inputContainerStyle={{
                backgroundColor: "#fff"
              }}
              placeholder="Search album titles"
              onChangeText={this.updateSearch}
              value={search}
            />
            {recordList}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

RecordListScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(RecordListScreen);
