





import React, { Component } from 'react';

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










// import React, { Component } from 'react';
// import Register from './Register';
// import axios from 'axios';

// class RegisterContainer extends Component {
//     static propTypes = {};

//     register = (e) => {
//         e.preventDefault();
//         console.log("EVENT: ", e);
//         // axios.post('http://localhost:3001/register')
//     };

//     render() {
//         return <Register register={this.register} />;
//     }
// }

// export default RegisterContainer;




// // axios
// //     .post('/auth/signup', {
// //         username: this.state.username,
// //         password: this.state.password
// //     })
// //     .then(response => {
// //         console.log(response)
// //         if (!response.data.errmsg) {
// //             console.log('youre good')
// //             this.setState({
// //                 redirectTo: '/login'
// //             })
// //         } else {
// //             console.log('duplicate')
// //         }
// //     })