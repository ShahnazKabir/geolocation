import React from 'react';
import './App.css';
import LocationModal from './components/LocationModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import isEqual from "lodash/isEqual";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

const mapStyles = {
    width: '100%',
    height: '100%'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myLocation : {
                lat : 52.520008,
                lng : 13.404954,
            },
            name : '',
            toggle : false,
            locationFetched : false,
        }
        this.watchLocation = this.watchLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    getLocation() {
        let object = this;

        //fetch current position
        navigator.geolocation.getCurrentPosition(function(position) {
            let myLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            object.setState({myLocation});
            object.setState({locationFetched : true})
        });
        this.watchLocation()
    }

    watchLocation() {
        //watch user position with change of location
        let object = this;
        if(!this.watchID && this.state.latitude && this.state.longitude) {
            this.watchID = navigator.geolocation.watchPosition((position) => {
                const myLastLocation = this.state.myLocation;
                let myLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }

                //set current location
                if (!isEqual(myLocation, myLastLocation)) {
                    object.setState({ myLocation});
                }

            });
        }
    }

    onMarkerClick() {
        this.setState({toggle : !this.state.toggle});
    }

    render() {
        return (
            <div className="App">
                <div className="App">
                    <Map
                        id="map"
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        onReady={(mapProps, map) => this.getLocation(mapProps, map)}
                        initialCenter={this.state.myLocation}
                        center={this.state.myLocation}
                    >
                        <Marker
                            onClick={this.onMarkerClick}
                            name={'USER'}
                            position={this.state.myLocation}
                        />
                    </Map>
                </div>
                <LocationModal show={this.state.toggle} coords={this.state.myLocation} handleClose={this.onMarkerClick}/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyArun5T3OYNz9rlJr6CofseI9lRZOaHVcY'
})(App);
