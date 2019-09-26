import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx';
import MainContainer from './MainContainer.jsx';
import axios from 'axios';
import key from '../../config/keys';
import Login from './Loginpage.jsx';
import Signup from './SignupPage.jsx';
import MapDisplay from './MapDisplay.jsx';

const LOCATION_SEARCHED = '1600 Main St 1st floor, Venice, CA 90291';
let MAX_SIZE = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      businessList: [],
      currentIndex: 0,
      visited: new Array(50),
      favs: [],
      fetchingDetails: false,
      isSidebarOpen: false,
      currentUser: '',
      verified: false,
      signup: false,
      rerender: false,
      dance: false,
      play: false,
      price: null,
      offset: 0,
      mapView: false,
      location: LOCATION_SEARCHED,
      cuisine: null,
      index: 0,
      // selectedRestaurant: null
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addFav = this.addFav.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.verify = this.verify.bind(this);
    this.secret = this.secret.bind(this);
    this.pressPlay = this.pressPlay.bind(this);
    this.create = this.create.bind(this);
    this.signup = this.signup.bind(this);
    this.signout = this.signout.bind(this);
    this.submitChoices = this.submitChoices.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCuisineChange = this.handleCuisineChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.viewMap = this.viewMap.bind(this);
    // this.displayRestaurant = this.displayRestaurant.bind(this);
    this.audio = new Audio(
      'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
    );
  }

  // function invokes when the show Favs button is clicked in Sidebar
  signup() {
    this.setState({ signup: true })
  }  

  signout() {
    axios
      .post('/signout', {user: this.state.currentUser})
      .then(res => {
        if(res.data === 'signedOut') {
          this.setState({verified: false, currentUser: '', rerender: true})
        }
      })
      .catch(err=> console.log(err))
  }

  create(e) {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    axios
      .post('/signup/create', { user: user, pass: pass })
      .then(res => { 
        if(res.data === 'user Created') {
          this.setState({ verified: true, currentUser: user, signup: false, rerender: true})
        }
      })
      .catch(err=> console.log(err))
  }

  submitChoices() {
    // console.log(this.state.location, this.state.cuisine, this.state.price);
    const location = this.state.location || LOCATION_SEARCHED;
    const cuisine = this.state.cuisine || 'restaurant';
    const price = this.state.price || '7';
    axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
        {
          headers: {
            Authorization: `Bearer ${key.API_KEY}`
          },
          params: {
            categories: 'restaurants, All',
            term: `${cuisine}`,
            limit: 50,
            location: location,
            price: `${price.length}`,
            offset: this.state.offset
          }
        }
      )
      .then(res => {
        // create state businessList with necessary infos
        let businessList = [];
        for (let restaurant of res.data.businesses) {
          const businessObj = {
            yelpid: restaurant.id,
            name: restaurant.name,
            address:
              restaurant.location.display_address[0] +
              ', ' +
              restaurant.location.display_address[1],
            imgurl: restaurant.image_url,
            yelpurl: restaurant.url,
            rating: restaurant.rating,
            phone: restaurant.phone,
            coordinates: restaurant.coordinates
          };
          businessList.push(businessObj);
        }
        MAX_SIZE = businessList.length;
        const currentIndex = getRandomNum(MAX_SIZE);
        this.setState({
          businessList,
          currentIndex,
          rerender: false
        });
      })
  }

  handleOptionChange(e) {
    this.setState({price: e.target.value});
  }

  handleLocationChange(e) {
    this.setState({location: e.target.value});
  }

  handleCuisineChange(e) {
    this.setState({cuisine: e.target.value});
  }


  //login functions
  verify(e) {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;

    // console.log('username and password', user, pass)

    axios
      .post('/login', { user: user, pass: pass })
      .then(res => {
        // console.log('testing response from login', res)
        if (res.data === 'verified') {
          this.setState({ verified: true, currentUser: user, rerender: true });
        }
      })
      .catch(err => console.log(err));
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  // function invokes when the heart button is clicked in MainContainer
  addFav() {
    if(this.state.index === 40) {
      this.setState({offset: this.state.offset + 50, visited: new Array(50), index: 0})
      this.submitChoices();
    }
    else {
    let favs = this.state.favs.slice();
    let visited = this.state.visited.slice();

    favs.push(this.state.businessList[this.state.currentIndex]);
    visited[this.state.currentIndex] = true;

    let currentIndex = getRandomNum(MAX_SIZE);

    // if currentIndex is already stored in visited, get another one
    while (visited[currentIndex]) {
      currentIndex = getRandomNum(MAX_SIZE);
    }

    this.setState({
      currentIndex,
      visited,
      favs,
      fetchingDetails: false,
      index: this.state.index+1
    });

    axios
      .post('/favorites', {
        business: this.state.businessList[this.state.currentIndex],
        user: this.state.currentUser
      })
      .then(res => {
        console.log(this.state.currentUser, '<------------- current user')
        console.log(res.data, '<_---------------@@!!');
      })
      .catch(err => console.log(err));
  }
}

  // function invokes when '??' button is clicked in Sidebar
  deleteFav(yelpid) {
    axios
      .delete('/favorites', {
        data: { currentUser: this.state.currentUser, yelpid }
      })
      .then(res => {
        const updateFavs = this.state.favs.filter(fav => fav.yelpid !== yelpid);
        this.setState({ favs: updateFavs });
      })
      .catch(err => console.log(err));
  }

  // function invokes when the next button is clicked in MainContainer
  moveNext() {
    if(this.state.index === 40) {
      this.setState({offset: this.state.offset + 50, visited: new Array(50), index: 0})
      this.submitChoices();
    }
    else {
    let visited = this.state.visited.slice();
    visited[this.state.currentIndex] = true;

    let currentIndex = getRandomNum(MAX_SIZE);
    // if currentIndex is already visited get another one
    while (visited[currentIndex]) {
      currentIndex = getRandomNum(MAX_SIZE);
    }

    this.setState({
      currentIndex,
      visited,
      fetchingDetails: false,
      index: this.state.index+1
    });
  }
  }

  secret() {
    this.setState({ dance: !this.state.dance });
  }

  pressPlay() {
    this.setState({ play: true });
    this.audio.play();
  }

  componentDidMount () {
    axios
      .get('/signedin')
      .then(res=> {
        // console.log('looking to see what is in res.data',res)
        if (res.data.verified === 'verified') {
          this.setState({ verified: true, currentUser: res.data.cookie.user, rerender: true});
        }
      })
      .catch(err => console.log(err))
  }
  
  componentDidUpdate() {
    if (this.state.rerender) {
      // get data from yelp business endpoint
      axios
        .get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${LOCATION_SEARCHED}`,
          {
            headers: {
              Authorization: `Bearer ${key.API_KEY}`
            },
            params: {
              categories: 'restaurants, All',
              limit: 50
            }
          }
        )
        .then(res => {
          // create state businessList with necessary infos
          let businessList = [];
          for (let restaurant of res.data.businesses) {
            const businessObj = {
              yelpid: restaurant.id,
              name: restaurant.name,
              address:
                restaurant.location.display_address[0] +
                ', ' +
                restaurant.location.display_address[1],
              imgurl: restaurant.image_url,
              yelpurl: restaurant.url,
              rating: restaurant.rating,
              phone: restaurant.phone,
              coordinates: restaurant.coordinates
            };
            businessList.push(businessObj);
            // console.log(businessObj.coordinates)
          }
          // get favorites from back end database
          axios
            .post('/favorites/fav', { user: this.state.currentUser })
            .then(({ data }) => {
              const favs = data;
              // filtering favs from business list
              const yelpIdArr = [];

              for (const fav of favs) {
                yelpIdArr.push(fav.yelpid);
              }

              const filteredBusinessList = businessList.filter(businessObj => {
                return yelpIdArr.indexOf(businessObj.yelpid) === -1;
              });

              MAX_SIZE = filteredBusinessList.length;
              const currentIndex = getRandomNum(MAX_SIZE);

              this.setState({
                businessList: filteredBusinessList,
                currentIndex,
                favs,
                rerender: false
              });
            })
            .catch(err =>
              console.log(`App.componentDidMount: get favorites: Error: ${err}`)
            );
        })
        .catch(err =>
          console.log(
            `App.componentDidMount: get businesses from yelp: Error: ${err}`
          )
        );
    }
  }

  viewMap() {
    this.setState({mapView: !this.state.mapView});
  }

//   displayRestaurant(selectedRestaurant) {
//     this.setState({selectedRestaurant: selectedRestaurant});
// }

  render() {
    
    if (this.state.signup === true) {
      return (
        <main>
          <Signup creation={this.create}  />
        </main>
      )
    }
    if (this.state.verified === false) {
      return (
        <main>
          <Login verification={this.verify} signup={this.signup} />
        </main>
      );
    }
    if (this.state.businessList.length === 0) {
      return (
        <main>
          <div className='modal'>
            <h1>Loading...</h1>
          </div>
        </main>
      );
    }
    
    if (this.state.mapView === true) {
      console.log('these are the props being passed down', this.state.businessList)
      return (
        <MapDisplay 
        viewMap={this.state.viewMap}
        viewMapFunc={this.viewMap}
        businessList={this.state.businessList} />
        )
      } else {
        console.log('here in post change of state');
      }

    let dance = this.state.dance ? 'dance' : '';

    return (
      <div className={`container ${dance}`}>
        <Sidebar
          submitChoices={this.submitChoices}
          favs={this.state.favs}
          isSidebarOpen={this.state.isSidebarOpen}
          toggleSidebar={this.toggleSidebar}
          deleteFav={this.deleteFav}
          dance={this.state.dance}
          secret={this.secret}
          pressPlay={this.pressPlay}
          handleOptionChange={this.handleOptionChange}
          handleLocationChange={this.handleLocationChange}
          handleCuisineChange={this.handleCuisineChange}
          price={this.state.price}
          businessList={this.state.businessList}
          signout={this.signout}
          viewMap={this.viewMap}
        />
        <MainContainer
          currentBusiness={this.state.businessList[this.state.currentIndex]}
          addFav={this.addFav}
          moveNext={this.moveNext}
        />
      </div>
    );
  }
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

export default App;
