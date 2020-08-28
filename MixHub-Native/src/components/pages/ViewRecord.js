import axios from 'axios';
import React, {Component} from 'react'
import PropTypes from "prop-types";
import { Image, TouchableHighlight, Linking, Text, View, Button, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { PricingCard } from 'react-native-elements';
import { logoutUser } from "../../actions/authActions";
import { Header } from 'react-native-elements';

let styles = {
  recordTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  subText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  subText2: {
    fontSize: 18
  },
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
  loginText: {
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
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 13,
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'red'
  },
  deleteText: {
    color: 'red'
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 13,
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#007bff'
  },
  editText: {
    color: '#007bff'
  },
}

const Record = props => (
  <View>
    <View className="thumbnail"></View>
    <Text className = "title" >Artist Name< /Text>
      <Text>{props.record.record_title}</Text>
      <Text>{props.record.record_artist}</Text>
    </View>
)

class ViewRecordScreen extends React.Component {
  constructor(props) {
    console.log("View Record called");
    super(props);
    console.log(props);
    const { navigation } = this.props;
    console.log();
    this.state = {
      record: {},
      _id : navigation.getParam('_id')
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/records/').then(res => res.json())
    // Loops through array of matches and filters by the title passed in through props
      .then(json => {
          this.setState({
            record: json.filter(record => record._id === this.state._id)
          });
          console.log(this.state.record);
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  record() {
    return this.state.records.map(function(currentRecord, i) {
      return <Record record={currentRecord} key={i} />;
    });
  }

  delete(id) {
        console.log("deleting");

        axios.delete('http://localhost:5000/records/delete/'+id)
            .then(response => {
                console.log(response);
                let records = this.state.records;
                let index = -1
                let counter = 0;
                for (let record of records) {
                    if (record._id === id) {
                        index = counter;
                        break
                    }
                    counter++;
                }

                if (index !== -1) {
                    records.splice(index, 1);
                    this.setState({
                        records: records
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLogoutClick = e => {
      console.log(e);
      this.props.logoutUser();
      this.props.navigation.navigate('Auth');
    };

  render() {
  const { navigation } = this.props;

  const { user } = this.props.auth;
  if (this.state.record[0]!==undefined) {
  }

  let deleteButton;
  let editButton;
  let purchaseButton;

  if (this.state.record[0]!==undefined) {
    if (this.state.record[0].record_owner===this.props.auth.user.id) {
      deleteButton = <TouchableOpacity style={styles.deleteButton}
        onPress={() => {
          this.delete(this.state.record[0]._id);
          this.props.navigation.navigate('AuthLoading');
          }
          }
          ><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>;
          editButton =<TouchableOpacity style={styles.editButton} onPress={() => this.props.navigation.navigate("EditRecord", {_id: this.state.record[0]._id})}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
        } else {
          editButton = <TouchableOpacity style={styles.editButton}><Text style={styles.editText}>Purchase</Text></TouchableOpacity>
        }

      } else{
        deleteButton = <View></View>;
        editButton = <View></View>
      }


  if (this.state.record[0]!==undefined) {
    let record = this.state.record[0];
    console.log(record);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
   size: 25, }}
/>
        <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 280, height: 200, alignSelf: 'center', marginTop: 10}}
          source={{uri:`http://localhost:5000/uploads/${record.record_image}`}}
        />
        </View>
        <PricingCard
  color="#4f9deb"
  title={ record.record_title }
  price={`€${ this.state.record[0].record_price }`}
  info={[
    `Artist: ${ this.state.record[0].record_artist } | Size: ${ this.state.record[0].record_size }"`,
    `Genre: ${ this.state.record[0].record_genre } | Type: ${ this.state.record[0].record_type }`,
    `Seller: ${ this.state.record[0].record_owner_name } | Date: ${ this.state.record[0].record_date }`,
    `${ this.state.record[0].record_owner_location }`
]}
  button={{ }}
/>
      <View style={{flexDirection: 'row', marginTop: 5}}>
      {deleteButton}
      {editButton}
      </View>
    </View>
  );
}else {
  return (<View></View>);
}
  }
  }

ViewRecordScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(ViewRecordScreen);
