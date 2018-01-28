import React, { Component } from 'react';
import axios from 'axios';

class RegisterContainer extends Component {

    state = {
        email: '',
        password: ''
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value.toLowerCase() });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value.toLowerCase() });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email: ", this.state.email);
        console.log("Password: ", this.state.password);
        axios.post('http://localhost:3001/register', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label> Password:
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default RegisterContainer;
