import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Map from "../Map/GoogleMap";
import Marker from "../Map/Marker";
import axios from "axios";

export default function List() {
  const [data, setData] = useState({ stores: [] });
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState();
  const [mapApi, setMapApi] = useState();

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMapInstance(map);
    setMapApi(maps);
  };
  useEffect(() => {
    function getStore() {
      axios.get("/stores").then(result => {
        if (result.data) {
          setData({ stores: result.data });
        }
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
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          {data.stores.map(store => (
            <Marker
              key={store.id}
              text={store.name}
              lat={store.lat}
              lng={store.lng}
            />
          ))}
        </Map>
      </div>
      <Link to="/stores/add">
        <Button variant="primary">Add Store</Button>
      </Link>
    </div>
  );
}
