"use client"

import React from "react";
// import "./styles.css";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.motion/dist/leaflet.motion.js";

export default function Map({ coordinates }: { coordinates: LatLngExpression[] }) {
  const [mapContext, setMapContext] = React.useState();

  const handleAddMarkerClick = () => {
    const instance = (L as any).motion.polyline(
      coordinates,
      {
        color: "red"
      },
      {
        auto: true,
        duration: 20000
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

    mapContext && (mapContext as any).addLayer(instance);
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded" onClick={handleAddMarkerClick}>Start Visualization</button>

      <MapContainer
        center={coordinates[0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "500px",
          width: "500px"
        }}
        // @ts-ignore
        whenReady={(event: any) => setMapContext(event.target)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
