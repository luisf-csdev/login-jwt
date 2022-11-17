import React, { Component } from 'react'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                token: window.localStorage.getItem('token')
            })
        }).then(res => res.json()).then(data => {
            console.log(data, 'userData')
            this.setState({ userData: data.data })
        })
    }
    signOut = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('logged');
        window.location.href = '/';
    }

    render() {
        return (
            <div className='form-container'>
                <header><h3>Credentials</h3></header>
                Name:<h1>{this.state.userData.name}</h1>
                Email:<h1>{this.state.userData.email}</h1>
                <button onClick={this.signOut}>Sign Out</button>
                <footer>Note: this page has the only purpose to show how the login api works</footer>
            </div>
        )
    }
}
