import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ children, ...props }) => (
  <div style={{ height: "100%", wigth: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

GoogleMap.defaultProps = {
  children: null
};

export default GoogleMap;
