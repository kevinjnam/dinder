import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        const { isSidebarOpen, deleteFav, favs, toggleSidebar } = this.props;

        const favsList = favs.map(fav => {
            return (
                <li key={fav._id}>
                    <p>{fav._id}</p>
                    <p>{fav.name}</p>
                    <p>{fav.address}</p>
                    <button onClick={() => deleteFav(fav._id)}>remove</button>
                </li>
            )
        })

        // when sidebar is open, show favs list
        if (isSidebarOpen) {
            return (
                <div style={{width: '25%', float: 'right', background: 'royalblue'}}>
                    <button style={{float: 'right', color: 'red'}} onClick={() => toggleSidebar()}>X</button>
                    <h3>Favorited restaurants:</h3>
                    <ul>
                        {favsList}
                    </ul>
                </div>
            );
        }

        // when sidebar is collapsed, only show the Show Favs button
        return (
            <div>
                <button onClick={() => {toggleSidebar(); favs}}>Show Favs</button>
            </div>
        );
    }
}


export default Sidebar;