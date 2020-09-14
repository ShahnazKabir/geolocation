import React from 'react';
import './App.css';
import isEqual from 'lodash/isEqual';
import { Map, Marker, GoogleApiWrapper  } from 'google-maps-react';
import LocationModal from './components/LocationModal'

import { Modal, Button } from 'react-bootstrap';

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
        });
        this.watchLocation()
    }

    onMarkerClick() {
        this.setState({toggle : !this.state.toggle});
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


    render() {
        console.log(this.state.toggle)
        return (
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
                <Modal show={this.state.toggle} onHide={this.onMarkerClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onMarkerClick}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onMarkerClick}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyArun5T3OYNz9rlJr6CofseI9lRZOaHVcY'
})(App);
