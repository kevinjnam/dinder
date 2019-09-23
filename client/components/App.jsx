import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MainContainer from './MainContainer.jsx';
import axios from 'axios';
import key from '../../config/keys';

const LOCATION_SEARCHED = '1600 Main St 1st floor, Venice, CA 90291';
let MAX_SIZE = 0;

class App extends Component {
    constructor(){
      super();
      this.state = {
        businessList: [],
        currentIndex: 0,
        visited: {},
        favs: [],
        fetchingDetails: false,
      };

      this.showFavs = this.showFavs.bind(this);
      this.addFav = this.addFav.bind(this);
      this.moveNext = this.moveNext.bind(this);
    }

    showFavs() {
        console.log('showFavs is clicked');
    } 

    // function invokes when the heart button is clicked in MainContainer
    addFav() {
        let favs = this.state.favs.slice();
        let visited = Object.assign(this.state.visited);

        favs.push(this.state.businessList[this.state.currentIndex]);
        visited[this.state.currentIndex] = true;
        
        let currentIndex = getRandomNum(MAX_SIZE);

        // if currentIndex is already stored in visited, get another one
        while(visited[currentIndex]) {
            currentIndex = getRandomNum(MAX_SIZE);
        }

        this.setState({
            currentIndex,
            visited,
            favs,
            fetchingDetails: false
        })

        // post new favorite which is current business to the database 
        axios.post('/favorites', this.state.businessList[this.state.currentIndex])
            .then(res => {
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
        while(visited[currentIndex]) {
            currentIndex = getRandomNum(MAX_SIZE);
        }

        this.setState({
            currentIndex,
            visited,
            fetchingDetails: false
        })
    }

    componentDidMount() {
        // get data from yelp business endpoint
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${LOCATION_SEARCHED}`, {
            headers: {
                Authorization: `Bearer ${key.API_KEY}`
            },

            params: {
                categories: 'restaurants, All',
                limit: 50
            }
        }) 
            .then((res) => { 
                // create state businessList with necessary infos           
                let businessList = [];
                for (let restaurant of res.data.businesses) {
                    const businessObj = {
                        yelpid: restaurant.id,
                        name: restaurant.name,
                        address: restaurant.location.display_address[0] + ", " + restaurant.location.display_address[1],
                        imageURL: [restaurant.image_url],
                        yelpURL: restaurant.url
                    }
                    businessList.push(businessObj);
                }

                // get favorites from back end database 
                axios.get('/favorites') 
                    .then(({ data }) => {
                        const favs = data;
                        
                        // filtering favs from business list
                        const yelpIdArr = [];
                        
                        for(const fav of favs) {
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
                            favs
                        });

                        console.log('this.state.businessList: ', this.state.businessList);
                        console.log('this.state.favs: ', this.state.favs);
                    })
                    .catch(err => console.log(`App.componentDidMount: get favorites: Error: ${err}`));
            })
            .catch(err => console.log(`App.componentDidMount: get businesses from yelp: Error: ${err}`));
    }

    render() {
        if(this.state.businessList.length === 0) {
            return (
                <div>
                    <h1>LOADING...</h1>
                </div>
            )
        }

        return (
            <div>
                <h1>Dinder</h1>
                <Navbar showFavs={this.showFavs}/>
                <MainContainer currentBusiness={this.state.businessList[this.state.currentIndex]} addFav={this.addFav} moveNext={this.moveNext} />
            </div>
        )
    }

}

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

export default App;
