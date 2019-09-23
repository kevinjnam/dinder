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
          <img src={fav.imgurl} />
          <div className='fav-details'>
            <p>{fav.name}</p>
            <p>{fav.address}</p>
          </div>
          <button className='next' onClick={() => deleteFav(fav._id)}>
            <i class='fa fa-times'></i>
          </button>
        </li>
      );
    });

    // when sidebar is open, show favs list
    if (isSidebarOpen) {
      return (
        <div className='popup'>
          <div className='popup-header'>
            <h3>Favorited restaurants:</h3>
            <button className='back' onClick={() => toggleSidebar()}>
              <i class='fa fa-arrow-left'></i>
            </button>
          </div>
          <ul>{favsList}</ul>
        </div>
      );
    }

    // when sidebar is collapsed, only show the Show Favs button
    return (
      <nav>
        <div className='image-frame'>
          <img className='logo' src={'../assets/logo.png'} />
        </div>
        <h1>Dinder</h1>
        <button
          className='history'
          onClick={() => {
            toggleSidebar();
            favs;
          }}
        >
          <i class='fa fa-history'></i>
        </button>
      </nav>
    );
  }
}

export default Sidebar;
