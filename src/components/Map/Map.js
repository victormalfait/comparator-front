import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMap from "google-map-react";

export default class Map extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number
  };

  static defaultProps = {
    center: [48.866667, 2.333333],
    zoom: 9
  };

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        center={this.props.center}
        zoom={this.props.zoom}
      ></GoogleMap>
    );
  }
}
