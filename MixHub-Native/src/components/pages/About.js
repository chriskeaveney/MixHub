import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
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
  aboutText: {
    marginTop: 15,
    marginLeft: 50,
    marginRight: 50
  },
  container: {
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center"
  },
};

class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
      <Image
        style={{width: 360, height: 230, alignSelf: 'center'}}
        source={require('../../image/lineup1.jpg')}
      />
      <Text style={styles.aboutText}>MixHub is an online platform for buying and selling new or used
            vinyl records. The idea of MixHub is to allow music lovers of all
            ages to trade their vinyl records through the MixHub marketplace
            with ease.
      </Text>
      <Text style={styles.aboutText}>
            Whether you wish to sell your old records taking up space at home
            or build upon your newly found collection.You can view any records
            from the list provided on the homepage showing all latest records
            in our online collection. One can also list their own records
            from the 'create record' tab at the bottom tab or edit & delete
            their sold records.
      </Text>
      </View>
    );
  }
}

export default AboutScreen;
