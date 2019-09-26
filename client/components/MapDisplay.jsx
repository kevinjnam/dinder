import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';


const MapDisplay = props => {
    console.log(props)
    const [viewport, setViewport] = useState({
        latitude: props.businessList[3].coordinates.latitude,
        longitude: props.businessList[3].coordinates.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    let coordinates = props.businessList.map((restaurant, idx) => {
        console.log('coordinates mapping', restaurant.address)
        return (<Marker 
            key={idx}
            latitude={restaurant.coordinates.latitude}
            longitude={restaurant.coordinates.longitude}
            >
            <button className='markerBtn'
            onClick={e => {
                e.preventDefault();
                console.log('restaurant', restaurant.name)
                setSelectedRestaurant(restaurant);
                setViewport({
                    latitude: restaurant.coordinates.latitude,
                    longitude: restaurant.coordinates.longitude,
                    width: '100vw',
                    height: '100vh',
                    zoom: 13
                });
            }}>
                <img src="../assets/blue-pin.svg" alt=""/>
            </button>
            </Marker>)
    })
    console.log('these are the coordinates', selectedRestaurant)
    return (
        <div className='MapDisplay'>
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZGFtZW5leXJvIiwiYSI6ImNrMHpuYmw4ZTAyaWozY21wNTZjd3VrNnQifQ.wwTTRLbq1G9ARNagBeeY8g'}
        mapStyle={'mapbox://styles/dameneyro/ck0zsvgrj0bnk1crzaia78md8'}
        onViewportChange={viewport => {setViewport(viewport)}}
        >
        <div>
        {coordinates}
        {selectedRestaurant && (
                <Popup
                latitude={selectedRestaurant.coordinates.latitude}
                longitude={selectedRestaurant.coordinates.longitude}
                className='popup'
                closeOnClick={false}
                onClose={() => 
                setSelectedRestaurant(null)
                }
                >
                    <div>
                        <a href={selectedRestaurant.yelpurl} target="_blank"><img src={selectedRestaurant.imgurl} className='popupImage'/></a>
                        <h4 className='popup-name'>{selectedRestaurant.name}</h4>
                        <p className='popup-summary'>{selectedRestaurant.address}</p>
                    </div>
                </Popup>
            )}
        </div>
        <button id="viewMapInMapDisplay" onClick={() => {props.viewMapFunc()}}><i className="fas fa-undo"></i></button>
        </ReactMapGl>
        </div>
    );
};


export default MapDisplay;