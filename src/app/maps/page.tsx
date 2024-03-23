"use client"

import React from "react";
// import "./styles.css";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.motion/dist/leaflet.motion.js";

export default function Page() {
  const [mapContext, setMapContext] = React.useState();

  const handleAddMarkerClick = () => {
    const instance = L.motion.polyline(
      [
        [-8.798297, 115.222575],
        [-8.784937, 115.194508]
      ],
      {
        color: "red"
      },
      {
        auto: true,
        duration: 10000
      },
      {
        removeOnEnd: false,
        showMarker: true,
        icon: L.icon({
          iconUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png",
          iconSize: [20, 30]
        })
      }
    );

    mapContext && mapContext.addLayer(instance);
  };

  return (
    <>
      <button onClick={handleAddMarkerClick}>add marker</button>
      <MapContainer
        center={[-8.791172, 115.213391]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "100vh",
          width: "100%"
        }}
        whenReady={(event) => setMapContext(event.target)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
