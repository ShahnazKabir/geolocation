import React, { Component } from 'react';
import classNames from 'classnames';

const latRegex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const lngRegex = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

export default class FormComponent extends Component {
    coords = this.props.coords.lat + ', ' + this.props.coords.lng;
    formDefaults = {
        coordinates: { value: this.coords, isValid: true, message: '' },
        userName: { value: '', isValid: true, message: '' },
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.formDefaults
        };
    }

    onChange = (e) => {
        const state = {
            ...this.state,
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
            }
        };
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        // reset states before the validation procedure is run.
        this.resetValidationStates();
        // run the validation, and if it's good move on.
        if (this.formIsValid()) {
            console.log('My location coordinates: ', this.state.coordinates.value);
            console.log('My Name: ', this.state.userName.value)
            this.props.modalClose();
        }
    }

    formIsValid = () => {
        const coordinates = { ...this.state.coordinates };
        const userName = { ...this.state.userName };
        let isGood = true;

        if(coordinates.value.includes(',')) {
            var res = coordinates.value.split(",");
            let validLet = latRegex.test(res[0].trim());
            let validLng = lngRegex.test(res[1].trim());
            if(!validLet) {
                coordinates.isValid = false;
                coordinates.message = 'Not A Valid Latitude';
                isGood = false;
            }
            if(!validLng) {
                coordinates.isValid = false;
                coordinates.message = 'Not A Valid Longitude';
                isGood = false;
            }
            if(!validLng && !validLng) {
                coordinates.isValid = false;
                coordinates.message = 'Not A Valid Coordinates';
                isGood = false;
            }
        } else {
            coordinates.isValid = false;
            coordinates.message = 'Input Must Be Two Number Separated By A Comma';
            isGood = false;
        }

        if(userName.value.length <= 0) {
            userName.isValid = false;
            userName.message = 'Name Must Be A String of Minimum 6 Character';
            isGood = false;
        }

        if (!isGood) {
            this.setState({
                coordinates,
                userName,
            });
        }

        return isGood;
    }

    resetValidationStates = () => {
        // make a copy of everything in state
        const state = JSON.parse(JSON.stringify(this.state));

        Object.keys(state).map(key => {
            if (state[key].hasOwnProperty('isValid')) {
                state[key].isValid = true;
                state[key].message = '';
            }
        });

        this.setState(state);
    }

    render() {
        const { coordinates, userName } = this.state;
        /*
        Each of the group classes below will include the 'form-group' class,
        and will only include the 'has-error' class if the isValid value is false.
        */
        const coordsGroupClass = classNames('form-group',
            { 'has-error': !coordinates.isValid }
        );
        const nameGroupClass = classNames('form-group',
            { 'has-error': !userName.isValid }
        );

        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Create Account</h2>

                    <div className={coordsGroupClass}>
                        <input
                            type="text"
                            name="coordinates"
                            className="form-control"
                            placeholder="Latitude, Longitude"
                            value={coordinates.value}
                            onChange={this.onChange}
                            autoFocus
                        />
                        <span className="help-block">{coordinates.message}</span>
                    </div>

                    <div className={nameGroupClass}>
                        <input
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="Name"
                            value={userName.value}
                            onChange={this.onChange}
                        />
                        <span className="help-block">{userName.message}</span>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};
