import React from 'react';
import './App.css';
import isEqual from 'lodash/isEqual';
import { Map, Marker  } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          myLocation : null,
          name : '',
        }
        this.watchLocation = this.watchLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    getLocation() {
        let object = this;

        //fetch current position
        navigator.geolocation.getCurrentPosition(function(position) {
            const myLocation = position.coords;
            object.setState({myLocation});
        });
    }

    watchLocation() {
        let object = this;
        //watch user position with change of location

        this.watchID = navigator.geolocation.watchPosition((position) => {
            const myLastLocation = this.state.myLocation;
            const myLocation = position.coords;

            //set current location
            if (!isEqual(myLocation, myLastLocation)) {
                object.setState({ myLocation });
            }

        });
    }

    onMarkerClick() {
        console.log('click')
    }

    componentDidMount() {
      this.getLocation();
    }

    componentDidUpdate() {
        if(!this.watchID && this.state.latitude && this.state.longitude) {
            this.watchLocation();
        }
    }


    render() {
      return (
          <div className="App">
              <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                      lat: 40.560001,
                      lng: -74.290001
                  }}
              >
                  <Marker
                      onClick={this.onMarkerClick}
                      name={'This is test name'}
                      position={{lat: 37.759703, lng: -122.428093}}
                  />
              </Map>
          </div>
      );
  }
}

export default GoogleApiWrapper({
    apiKey: 'API_KEY'
})(App);
