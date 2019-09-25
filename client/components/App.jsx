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
      visited: {},
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
      mapView: false
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
    this.handleOptionChange = this.handleOptionChange.bind(this);
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
        console.log(res)
        if(res.data === 'signedOut') {
          this.setState({verified: false, currentUser: '', rerender: true})
        }
      })
      .catch(err=> console.error(err))
  };

  create(e) {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    console.log('these are the input values', user, pass)
    axios
      .post('/signup/create', { user: user, pass: pass })
      .then(res => { 
        console.log(res);
        if(res.data === 'user Created') {
          this.setState({ verified: true, currentUser: user, rerender: true, signup: false})
        }
      })
      .catch(err=> console.error)
  }


  submitChoices(e) {
    e.preventDefault();
    const location = e.target.location.value || LOCATION_SEARCHED;
    const cuisine = e.target.cuisine.value || 'restaurant';
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
          console.log(restaurant)
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
            phone: restaurant.phone
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


  //login functions
  verify(e) {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;

    console.log('data to login')

    axios
      .post('/login', { user: user, pass: pass })
      .then(res => {
        if (res.data === 'verified') {
          this.setState({ verified: true, currentUser: user, rerender: true });
        }
      })
      .catch(err => console.error);
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  // function invokes when the heart button is clicked in MainContainer
  addFav() {
    console.log(this.state.businessList, '<--- businessList')
    console.log(this.state.visited, '<--- visited')
    
    let favs = this.state.favs.slice();
    let visited = Object.assign(this.state.visited);

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
      fetchingDetails: false
    });

    // post new favorite which is current business to the database
    axios
      .post('/favorites', {
        business: this.state.businessList[this.state.currentIndex],
        user: this.state.currentUser
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error);
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
        console.log(res.data);
      })
      .catch(err => console.error);
  }

  // function invokes when the next button is clicked in MainContainer
  moveNext() {
    let visited = Object.assign(this.state.visited);
    visited[this.state.currentIndex] = true;

    let currentIndex = getRandomNum(MAX_SIZE);
    // if currentIndex is already visited get another one
    while (visited[currentIndex]) {
      currentIndex = getRandomNum(MAX_SIZE);
    }

    this.setState({
      currentIndex,
      visited,
      fetchingDetails: false
    });
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

        if (res.data.verified === 'verified') {
          this.setState({ verified: true, currentUser: res.data.user, rerender: true});
        }
      })
      .catch(err => console.error)
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
            console.log(restaurant)
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
              // coordinates: restaurant.coordinates
            };
            businessList.push(businessObj);
          }
          // console.log('business list in fucking app.kjsx', businessList[0]);
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
              // console.log("this.state.businessList: ", this.state.businessList);
              // console.log("this.state.favs: ", this.state.favs);
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
    this.setState({mapView: true});
  }

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
      return (
        <MapDisplay 
        viewMap={this.state.viewMap} />
        )
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
          price={this.state.price}
          businessList={this.state.businessList}
          signout={this.signout}
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
