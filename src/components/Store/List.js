import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Map from "../Map/GoogleMap";
import axios from "axios";

export default function List() {
  const [stores, setStores] = useState([]);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState();
  const [mapApi, setMapApi] = useState();

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMapInstance(map);
    setMapApi(maps);
  };

  const renderMarker = (map, maps) => {
    stores.map(
      store =>
        new maps.Marker({
          position: { lat: store.lat, lng: store.lng },
          map,
          title: store.text
        })
    );
  };

  useEffect(() => {
    function getStore() {
      axios.get("/stores").then(result => {
        const array = [];
        if (result.data.length > 0) {
          result.data.map(store => array.push(store));
        }
        setStores(array);
      });
    }

    return getStore();
  }, []);

  return (
    <div>
      <h1>List Store</h1>
      <div></div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          defaultZoom={10}
          defaultCenter={[48.866667, 2.333333]}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY,
            libraries: ["places", "geometry"]
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            apiHasLoaded(map, maps);
            console.log(map);
            renderMarker(map, maps);
          }}
        ></Map>
      </div>
      <Link to="/stores/add">
        <Button variant="primary">Add Store</Button>
      </Link>
    </div>
  );
}
