import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isSidebarOpen,
      deleteFav,
      favs,
      toggleSidebar,
      dance,
      secret,
      pressPlay,
      submitChoices,
      handleOptionChange
    } = this.props;
    let playSecret = dance ? 'dance' : '';
    const favsList = favs.map((fav, idx) => {
      return (
        <li key={idx}>
          <img src={fav.imgurl} />
          <div className='fav-details'>
            <h4>{fav.name}</h4>
            <p>{fav.address}</p>
            <p>Phone: {fav.phone}</p>
            <p>Rating: {fav.rating} <span><i className="fa fa-star" aria-hidden="true"></i>
            </span></p>
          </div>
          <button className='next' onClick={() => deleteFav(fav.yelpid)}>
            <i className='fa fa-times'></i>
          </button>
        </li>
      );
    });

    // when sidebar is open, show favs list
    if (isSidebarOpen) {
      return (
        <div>
          <nav>
            <div className='nav-container'>
              <div
                className='image-frame'
                onClick={() => {
                  secret();
                  pressPlay();
                }}
              >
                <img className='logo' src={'../assets/logo.png'} />
              </div>
              <button
                className='history'
                onClick={() => {
                  toggleSidebar();
                  favs;
                }}
              >
                <i className='fa fa-history'></i>
              </button>
            </div>
          </nav>
          <div className='popup'>
            <div className='popup-header'>
              <h2>Favorites:</h2>
              <button className='back' onClick={() => toggleSidebar()}>
                <i className='fa fa-arrow-left'></i>
              </button>
            </div>
            <ul>{favsList}</ul>
          </div>
        </div>
      );
    }

    // when sidebar is collapsed, only show the Show Favs button
    return (
      <nav>
        <div className='nav-container'>
          <div
            className='image-frame'
            onClick={() => {
              secret();
              pressPlay();
            }}
          >
            <img className='logo' src={'../assets/logo.png'} />
          </div>      
           <form className="center-header" onSubmit={submitChoices}>
            <input text="text" id='location' name="location" placeholder="City or Zip Code..." />
            <input text="text" id='cuisine' name="cuisine" placeholder="Choose Your Cuisine..." />
            <select className="priceSelector" onChange={(e)=>{
              handleOptionChange(e);
            }}>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
            <button type="submit" id="selectChoiceButton" name="selectChoiceButton">
              <i className="fa fa-search" />
              </button>
           </form>
          <button
            className='history'
            onClick={() => {
              toggleSidebar();
              favs;
            }}
          >
            <i className='fa fa-history'></i>
          </button>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
