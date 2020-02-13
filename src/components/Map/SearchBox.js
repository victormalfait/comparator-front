import React, { Component, Fragment } from "react";
import _ from "lodash";
import Marker from "./Marker";
import GoogleMap from "./GoogleMap";
import SearchBox from "./SearchboxInput";

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: []
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });
  };

  addPlace = place => {
    this.setState({ places: place });
  };

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <Fragment>
        {mapApiLoaded && (
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            addplace={this.addPlace}
          />
        )}
        <GoogleMap
          defaultZoom={10}
          defaultCenter={[48.866667, 2.333333]}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY,
            libraries: ["places", "geometry"]
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {!_.isEmpty(places) &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))}
        </GoogleMap>
      </Fragment>
    );
  }
}

export default Searchbox;
