import React from 'react';

const Navbar = ({ showFavs }) => (
    <div>
        <button onClick={showFavs}>Show Favs</button>
    </div>
);

export default Navbar;