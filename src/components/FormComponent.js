import React, { Component } from 'react';
import classNames from 'classnames';
import validator from 'validator';

const coordRegex = /^((-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?),(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?))$/ ;

export default class FormComponent extends Component {
    formDefaults = {
        email: { value: '', isValid: true, message: '' },
        password: { value: '', isValid: true, message: '' },
        confirmPassword: { value: '', isValid: true, message: '' }
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
            // form processing here....
        }
    }

    formIsValid = () => {
        const email = { ...this.state.email };
        const password = { ...this.state.password };
        const confirmPassword = { ...this.state.confirmPassword };
        let isGood = true;
        let checkCoord = coordRegex.test(email)
        console.log(checkCoord)

        if (!validator.isEmail(email.value)) {
            email.isValid = false;
            email.message = 'Not a valid email address';
            isGood = false;
        }

        // perform addtion validation on password and confirmPassword here...

        if (!isGood) {
            this.setState({
                email,
                password,
                confirmPassword,
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

    resetForm = () => {
        this.setState(...this.formDefaults);
    }

    render() {
        const { email, password, confirmPassword } = this.state;
        /*
        Each of the group classes below will include the 'form-group' class,
        and will only include the 'has-error' class if the isValid value is false.
        */
        const emailGroupClass = classNames('form-group',
            { 'has-error': !email.isValid }
        );
        const passwordGroupClass = classNames('form-group',
            { 'has-error': !password.isValid }
        );
        const confirmGroupClass = classNames('form-group',
            { 'has-error': !confirmPassword.isValid }
        );

        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Create Account</h2>

                    <div className={emailGroupClass}>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            value={email.value}
                            onChange={this.onChange}
                            autoFocus
                        />
                        <span className="help-block">{email.message}</span>
                    </div>

                    <div className={passwordGroupClass}>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password.value}
                            onChange={this.onChange}
                        />
                        <span className="help-block">{password.message}</span>
                    </div>

                    <div className={confirmGroupClass}>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword.value}
                            onChange={this.onChange}
                        />
                        <span className="help-block">{confirmPassword.message}</span>
                    </div>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        );
    }
};
