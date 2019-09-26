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
      handleOptionChange,
      handleLocationChange,
      handleCuisineChange,
      signout
    } = this.props;
    let playSecret = dance ? 'dance' : '';
    const favsList = favs.map((fav, idx) => {
      // console.log(fav, '<---- fav')
      return (
        <li key={idx}>
          <a href={fav.yelpurl} target="_blank"> <img src={fav.imgurl}/> </a>
          <div className='fav-details'>
            <h4>{fav.name}</h4>
            <p>{fav.address}</p>
            <p><span>Phone: </span>{fav.phone}</p>
            <p><span>Rating: </span>{fav.rating} <span><i className="fa fa-star" aria-hidden="true"></i>
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
          <div className='favPopup'>
            <div className='favPopup-header'>
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
           <div className="center-header">
            <input text="text" id='location' name="location" placeholder="City or Zip Code..." onChange={(e)=>{handleLocationChange(e)}} />
            <input text="text" id='cuisine' name="cuisine" placeholder="Choose Your Cuisine..." onChange={(e)=>{handleCuisineChange(e)}} />
            <select className="priceSelector" onChange={(e)=>{handleOptionChange(e)}}>
              <option value="-">-</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
            <button onClick={submitChoices} id="selectChoiceButton" name="selectChoiceButton">
              <i className="fa fa-search" />
            </button>
           </div>
           <div className="navBar-buttons">
              <button id="viewMap" onClick={() => this.props.viewMap()}><i className="fas fa-map-marked-alt"></i></button>
              <button className='history' onClick={() => {
                toggleSidebar();
                favs;
              }}>
              <i className='fa fa-history'></i>
            </button>
            <button
              className='signout button'
              onClick={() => {
                signout()
              }} >
              <i className="fas fa-sign-out-alt"></i>
            </button>
            </div>
           </div>
      </nav>
    );
  }
}

export default Sidebar;
