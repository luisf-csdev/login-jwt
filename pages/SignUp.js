import React, { useState, Fragment } from 'react'
import Link from 'next/link';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userExists, setUserExists] = useState(false)
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [noMatch, setNoMatch] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            setNoMatch(false);
            await fetch('/api/register', {
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
                    if (data.success) {
                        setUserExists(false);
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000);
                    } else {
                        setUserExists(true);
                        setSuccess(false);
                    }
                })
        } else {
            setNoMatch(true);
        }
    }

    function toggleShow(e) {
        if (e.target.id === 'eye') {
            if (show) {
                document.getElementById('password')
                    .setAttribute('type', 'password');
                document.getElementById('eye').style.color = '#7a797e';
                setShow(false);
            } else {
                document.getElementById('password')
                    .setAttribute('type', 'text');
                document.getElementById('eye').style.color = '#5887ef';
                setShow(true);
            }
        } else {
            if (show) {
                document.getElementById('confirm-password')
                    .setAttribute('type', 'password');
                document.getElementById('c-eye').style.color = '#7a797e';
                setShow(false);
            } else {
                document.getElementById('confirm-password')
                    .setAttribute('type', 'text');
                document.getElementById('c-eye').style.color = '#5887ef';
                setShow(true);
            }
        }
    }

    return (
        <div className='container'>
            <div className='form-container s-up'>
                <header><h3>Create a Login account</h3></header>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='password-container'>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            minLength={8}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span className='show-container'>
                            <i id='eye' className="fa fa-eye" aria-hidden="true" onClick={toggleShow} />
                        </span>
                    </div>
                    <div className='password-container'>
                        <input
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm your Password'
                            minLength={8}
                            required
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <span className='show-container'>
                            <i id='c-eye' className="fa fa-eye" aria-hidden="true" onClick={toggleShow} />
                        </span>
                    </div>
                    {noMatch ? <p>Passwords don't match!</p> : <Fragment />}
                    <div>
                        <button type='submit'>
                            SIGN UP
                        </button>
                        <span className='cliffhanger'>
                            Already registered? <Link className='link' href='/'>Login!</Link>
                        </span>
                    </div>
                    {success ?
                        <p className='success'>Successfully registered: Redirecting to Login...</p>
                        : <Fragment />}
                    {userExists ? <p className='fail'>User already registered!</p> : <Fragment />}
                </form>
                <footer>Note: this page has the only purpose to show how the login api works</footer>
            </div>
        </div>
    )
}

export default SignUp;
