import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactMapGl, { Marker } from 'react-map-gl';


const MapDisplay = props => {
    const [viewport, setViewport] = useState({
        latitude: props.businessList[0].coordinates.latitude,
        longitude: props.businessList[0].coordinates.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 10
    });

    let coordinates = props.businessList.map((restaurant, idx) => {
        console.log('coordinates mapping', restaurant.address)
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
        {/* {props.businessList.length > 0 &&  */}
            {coordinates}
        // }; 
        </div>
        </ReactMapGl>

        </div>
    );
};


export default MapDisplay;