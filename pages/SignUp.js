import React, { Component, Fragment } from 'react'

var show = false;
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            noMatch: false,
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, password, confirmPassword } = this.state
        if (password === confirmPassword) {
            this.setState({ noMatch: false })
            fetch('http://localhost:3001/register', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        this.setState({ success: true });
                        setTimeout(() => {
                            window.location.href = './sign-in'
                        }, 1000);
                    }
                })
        } else {
            this.setState({ noMatch: true })
        }
    }

    toggleShow(e) {
        if (e.target.id === 'eye') {
            if (show) {
                document.getElementById('password')
                    .setAttribute('type', 'password');
                document.getElementById('eye').style.color = '#7a797e';
                show = false;
            } else {
                document.getElementById('password')
                    .setAttribute('type', 'text');
                document.getElementById('eye').style.color = '#5887ef';
                show = true;
            }
        } else {
            if (show) {
                document.getElementById('confirm-password')
                    .setAttribute('type', 'password');
                document.getElementById('c-eye').style.color = '#7a797e';
                show = false;
            } else {
                document.getElementById('confirm-password')
                    .setAttribute('type', 'text');
                document.getElementById('c-eye').style.color = '#5887ef';
                show = true;
            }
        }
    }

    render() {
        return (
            <div className='form-container s-up'>
                <header><h3>Create a Login account</h3></header>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        required
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        required
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <div className='password-container'>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            required
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <span className='show-container'>
                            <i id='eye' className="fa fa-eye" aria-hidden="true" onClick={this.toggleShow} />
                        </span>
                    </div>
                    <div className='password-container'>
                        <input
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm your Password'
                            required
                            onChange={e => this.setState({ confirmPassword: e.target.value })}
                        />
                        <span className='show-container'>
                            <i id='c-eye' className="fa fa-eye" aria-hidden="true" onClick={this.toggleShow} />
                        </span>
                    </div>
                    {this.state.noMatch === true ? <p>Passwords don't match!</p> : <Fragment />}
                    <div>
                        <button type='submit'>
                            SIGN UP
                        </button>
                        <span className='cliffhanger'>
                            Already registered? <a href='/sign-in'>Login!</a>
                        </span>
                    </div>
                    {this.state.success === true ?
                        <p className='success'>Successfully registered: Redirecting to Login...</p>
                        : <Fragment />}
                </form>
                <footer>Note: this page has the only purpose to show how the login api works</footer>
            </div>
        )
    }
}