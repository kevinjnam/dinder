import React from 'react';

const MainContainer = ({ currentBusiness, addFav, moveNext }) => (
    <div>
        <img src={currentBusiness.imageURL} height='500' width='500'></img>
        <button onClick={addFav}>Heart</button>
        <button onClick={moveNext}>Next</button>
    </div>
);

export default MainContainer;