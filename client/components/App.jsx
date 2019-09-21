import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MainContainer from './MainContainer.jsx';
import { Col, Container, Row } from 'reactstrap'

class App extends Component {
    constructor(){
      super();
      this.state = {
        url: 'http://pluspng.com/img-png/food-png-food-salad-image-2962-428.png'
      };

      this.showFavs = this.showFavs.bind(this);
      this.addFav = this.addFav.bind(this);
      this.moveNext = this.moveNext.bind(this);
    }

    showFavs() {
        console.log('showFavs is clicked');
    }

    addFav() {
        console.log('addFav is clicked');
    }

    moveNext() {
        console.log('moveNext is clicked');
    }

    // componentDidMount() {
    //     fetch('')
    // }

    render() {
        return (
        <div>
            <h1>Dinder</h1>
            <Navbar showFavs={this.showFavs}/>
            <MainContainer url={this.state.url} addFav={this.addFav} moveNext={this.moveNext} />
        </div>
        )
    }

}

export default App;