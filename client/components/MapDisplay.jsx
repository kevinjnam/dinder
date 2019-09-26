import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactMapGl, { Marker } from 'react-map-gl';


const MapDisplay = props => {
    console.log(props)
    const [viewport, setViewport] = useState({
        latitude: 34.1053,
        longitude: -118.352,
        width: '100vw',
        height: '100vh',
        zoom: 10
    });

    let coordinates = props.businessList.map((restaurant, idx) => {
        // console.log(restaurant.coordinates)
        return (<Marker 
            key={idx}
            latitude={restaurant.coordinates.latitude}
            longitude={restaurant.coordinates.longitude}
            >
            <button className='markerBtn'>
                <img src="../assets/logo.svg" alt=""/>
            </button>
            </Marker>)
    })
    console.log('these are the coordinates', coordinates)
    return (
        <div className='MapDisplay'>
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZGFtZW5leXJvIiwiYSI6ImNrMHpuYmw4ZTAyaWozY21wNTZjd3VrNnQifQ.wwTTRLbq1G9ARNagBeeY8g'}
        mapStyle={'mapbox://styles/dameneyro/ck1046iuf0mbx1djxyjdw6fxy'}
        onViewportChange={viewport => {setViewport(viewport)}}
        >
        <div>
        {coordinates}
        </div>
        <button id="viewMapInMapDisplay" onClick={() => {props.viewMapFunc()}}><i className="fas fa-undo"></i></button>
        </ReactMapGl>
        </div>
    );
};


export default MapDisplay;