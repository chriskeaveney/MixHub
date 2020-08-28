import { Card, Row, Col, Button } from 'react-bootstrap';
import React, {Component} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '92%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  this.state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
}

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

render() {
  return (
    <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{
         lat: 53.343247,
         lng: -6.261058
       }}>
       <Marker
          onClick={this.onMarkerClick}
          name={'Spindizzy Records'}
        />
        <Marker
           onClick={this.onMarkerClick}
           name={'Freebird Records'}
           position={{ lat : 53.342649, lng : -6.263866 }}
         />
         <Marker
            onClick={this.onMarkerClick}
            name={'Tower Records'}
            position={{ lat : 53.342415, lng : -6.257734 }}
          />
          <Marker
             onClick={this.onMarkerClick}
             name={'The RAGE - Record, Art and Game Emporium'}
             position={{ lat : 53.342136, lng : -6.263824 }}
           />
           <Marker
              onClick={this.onMarkerClick}
              name={'Sound Cellar'}
              position={{ lat : 53.343218, lng: -6.259022 }}
            />
            <Marker
               onClick={this.onMarkerClick}
               name={'All City'}
               position={{ lat: 53.344745, lng: -6.263797 }}
             />
             <Marker
                onClick={this.onMarkerClick}
                name={'The Secret Book and Record Store'}
                position={{ lat: 53.343247, lng: -6.261058 }}
              />
              <Marker
                 onClick={this.onMarkerClick}
                 name={'Claddagh Records Ltd'}
                 position={{ lat: 53.345269, lng: -6.263972 }}
               />
               <Marker
                  onClick={this.onMarkerClick}
                  name={'Golden Discs'}
                  position={{ lat: 53.340226, lng: -6.261444 }}
                />
                <Marker
                   onClick={this.onMarkerClick}
                   name={'Forbidden Planet International Dublin'}
                   position={{ lat: 53.346283, lng: -6.262168 }}
                 />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
  );
}
}

MapContainer.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default GoogleApiWrapper({
  mapStateToProps,
  apiKey: 'insert api key here'
})(MapContainer);
