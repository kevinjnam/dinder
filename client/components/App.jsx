import React, { Component } from 'react';
import { Button, Col, Container, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import Header from './Header.jsx';
import MainContainer from './MainContainer.jsx';
import axios from 'axios';
import key from '../../config/keys';

const locationSearched = '1600 Main St 1st floor, Venice, CA 90291';

class App extends Component {
    constructor(){
      super();
      this.state = {
        businessList: [],
        currentIndex: 0,
        favs: [{ name: 'Darren', address: '123 St.'}],
        collapsed: true
      };

      this.showFavs = this.showFavs.bind(this);
      this.addFav = this.addFav.bind(this);
      this.moveNext = this.moveNext.bind(this);
      this.toggleHeader = this.toggleHeader.bind(this);
    }

    showFavs() {
        console.log('showFavs is clicked');
    } 

    addFav() {
        let tempArr = [...this.state.favs];
        tempArr.push(this.state.businessList[this.state.currentIndex])
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            favs: tempArr
        })
    }

    moveNext() {
        this.setState({currentIndex: this.state.currentIndex + 1})
        console.log('moveNext is clicked');
    }

    toggleHeader() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentDidMount() {
        // get data from location searched using Yelp API
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
            headers: {
                Authorization: `Bearer ${key.API_KEY}`
            },
            params: {
                categories: 'dinner'
            }
        }) 
        .then((res) => {
            let businessArr = [];
            for (let restaurant of res.data.businesses) {
                const businessObj = {
                    name: restaurant.name,
                    address: restaurant.location.display_address[0] + ", " + restaurant.location.display_address[1],
                    imageURL: restaurant.image_url
                }
                businessArr.push(businessObj);
            }  
            this.setState({
                businessList: businessArr,
            });
        })
        .catch(err => console.error);

        // query data from db
        // axios.get('/favorites')
        // .then((favs => {
        //     this.setState({favs})
        // }))
        // .catch(err => console.log(err))
        console.log(this.state.favs)
    }

    render() {

        if (this.state.businessList.length === 0) {
            return (
                <Container>
                    <Row>
                        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
                    </Row>
                </Container>
                
            )
        } 

        if (this.state.collapsed === false) {
            return (

                
                <p>{this.state.favs}</p>
            )
        }

        return (
        <div>
            <Container>
                
                <Header showFavs={this.showFavs} toggleHeader={this.toggleHeader} isOpen={!this.state.collapsed} />
                <Row>
                    <MainContainer currentBusiness={this.state.businessList[this.state.currentIndex]} addFav={this.addFav} moveNext={this.moveNext} />
                </Row>
            </Container>
        </div>
        )
    }

}

export default App;