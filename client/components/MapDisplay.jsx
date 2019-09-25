import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactMapGl, { Marker } from 'react-map-gl';


const MapDisplay = props => {
    const [viewport, setViewport] = useState({
        latitude: 34.1053,
        longitude: -118.352,
        width: '100vw',
        height: '100vh',
        zoom: 10
    });

    return (
        <div>
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZGFtZW5leXJvIiwiYSI6ImNrMHpuYmw4ZTAyaWozY21wNTZjd3VrNnQifQ.wwTTRLbq1G9ARNagBeeY8g'}
        onViewportChange={viewport => {setViewport(viewport)}}
        >
        markers here</ReactMapGl>
        </div>
    );
};


export default MapDisplay;