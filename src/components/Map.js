import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { googleKey } from "../config";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    bounds: []
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  render() {
    var bounds = new this.props.google.maps.LatLngBounds();
    if (this.props.bounds) {
      for (var i = 0; i < this.props.bounds.length; i++) {
        bounds.extend(this.props.bounds[i]);
      }
    }

    return (
      <Map
        google={this.props.google}
        ref="map"
        onClick={this.onMapClicked}
        zoom={6}
        initialCenter={this.props.initialCenter}
        bounds={bounds}
        style={{ width: "100%", height: "100%" }}
      >
        {this.props.markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              onClick={this.onMarkerClick}
              name={marker.name}
              event={marker.event}
              position={marker.position}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div className="info">
            <h6>{this.state.selectedPlace.event}</h6>
            <span>{this.state.selectedPlace.name}</span>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleKey
})(MapContainer);
