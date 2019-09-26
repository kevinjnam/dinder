import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactMapGl, { Marker } from 'react-map-gl';


const MapDisplay = props => {
    const [viewport, setViewport] = useState({
        latitude: props.businessList[10].coordinates.latitude,
        longitude: props.businessList[10].coordinates.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    let coordinates = props.businessList.map((restaurant, idx) => {
        console.log('coordinates mapping', restaurant.address)
        return (<Marker 
                key={idx}
                latitude={restaurant.coordinates.latitude}
                longitude={restaurant.coordinates.longitude}
                >
                <button className='markerBtn'>
                    <img src="../assets/blue-pin.svg" alt=""/>
                </button>
                </Marker>)
    })
    console.log('these are the coordinates', coordinates)
    return (
        <div className='MapDisplay'>
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZGFtZW5leXJvIiwiYSI6ImNrMHpuYmw4ZTAyaWozY21wNTZjd3VrNnQifQ.wwTTRLbq1G9ARNagBeeY8g'}
        mapStyle={'mapbox://styles/dameneyro/ck0zsvgrj0bnk1crzaia78md8'}
        onViewportChange={viewport => {setViewport(viewport)}}
        >
        <div>
        
            {coordinates} 
        </div>
        </ReactMapGl>

        </div>
    );
};


export default MapDisplay;