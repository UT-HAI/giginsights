"use client"

import React, { useState } from 'react';
// import "./styles.css";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.motion/dist/leaflet.motion.js";

function clearMap(m: any) {
  if(m) {
    for(let i in m._layers) {
        if(m._layers[i]._path != undefined) {
            try {
                m.removeLayer(m._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + m._layers[i]);
            }
        } }
  }
}

function TimeRangeSelector({ data, selectedGroupIndex, setSelectedGroupIndex }: any) {
  const handleSelectChange = (event: any) => {
    setSelectedGroupIndex(event.target.value);
  };

  return (
    <div className="p-8 bg-white rounded-lg">
      <h1 className="text-lg font-semibold mb-3">Select a Time Range</h1>
      <div className="mb-4">
        <select
          value={selectedGroupIndex}
          onChange={handleSelectChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          {data.timeRanges.map((range: any, index: any): any => (
            <option key={index} value={index}>
              {range}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-md font-semibold mb-2">Details for Selected Time Range</h2>
        <p className="mb-1"><b>Time Range:</b> {data.timeRanges[selectedGroupIndex]}</p>
        <p className="mb-1"><b>Duration:</b> {data.durations[selectedGroupIndex]} seconds</p>
        <p><b>Data Count:</b> {data.groupedData[selectedGroupIndex].length}</p>
      </div>
    </div>
  );
}

export default function Map({ data }: { data: any }) {
  console.log("new coordinates", data)
  const [mapContext, setMapContext] = React.useState();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0); // Store index of the selected group

  const handleAddMarkerClick = () => {
    const instance = (L as any).motion.polyline(
      data["groupedData"][selectedGroupIndex],
      {
        color: "red"
      },
      {
        auto: true,
        duration: data["durations"][selectedGroupIndex] * 2 // set duration based on duration of ride
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

    clearMap(mapContext)

    mapContext && (mapContext as any).addLayer(instance);
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded" onClick={handleAddMarkerClick}>Start Visualization</button>
      <TimeRangeSelector data={data} selectedGroupIndex={selectedGroupIndex} setSelectedGroupIndex={setSelectedGroupIndex}></TimeRangeSelector>

      <MapContainer
        center={data["groupedData"][selectedGroupIndex][0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "500px",
          width: "500px"
        }}
        // @ts-ignore
        whenReady={(event: any) => setMapContext(event.target)}
        className="p-8"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
