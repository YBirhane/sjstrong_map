import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as businessData from "./data/sj-businesses.json";


function Map() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedBusiness(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 37.3382, lng: -121.893028 }}
     // defaultOptions={{ styles: mapStyles }}
    >
      {businessData.features.map(business => (
        <Marker
          key={business.properties.BUSINESS_ID}
          position={{
            lat: business.geometry.coordinates[1],
            lng: business.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedBusiness(business);
          }}
          // icon={{
          //   url: `/skateboarding.svg`,
          //   scaledSize: new window.google.maps.Size(25, 25)
          // }}
        />
      ))}

      {selectedBusiness && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedBusiness(null);
          }}
          position={{
            lat: selectedBusiness.geometry.coordinates[1],
            lng: selectedBusiness.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedBusiness.properties.NAME}</h2>
            <p>{selectedBusiness.properties.DESCRIPTIO}</p>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBusiness.properties.GOOGLE_DEST}`}>{selectedBusiness.properties.ADDRESS}</a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function BusinessMap() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          'AIzaSyClnCTq92pPMYuM6Sgu1ioXhwD86HnXKdE'
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

