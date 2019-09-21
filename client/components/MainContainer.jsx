import React from 'react';

const MainContainer = ({ url, addFav, moveNext }) => (
    <div>
        <img src={url} height='400' width='400'></img>
        <button onClick={addFav}>Heart</button>
        <button onClick={moveNext}>Next</button>
    </div>
);

export default MainContainer;