import React, { Component } from 'react';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // bind functions
    }

    render() {
        // destructuring props
        const { currentBusiness, showMoreDetail, addFav, moveNext} = this.props;
        return (
            <div>
                <img src={currentBusiness.imageURL} onClick={() => showMoreDetail(currentBusiness.yelpid)} height='500' width='500'></img>
                <button onClick={addFav}>Heart</button>
                <button onClick={moveNext}>Next</button>
            </div>
        );
    };
}

export default MainContainer;