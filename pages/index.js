import React, { useState, Fragment } from 'react';
import Link from 'next/link';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFail(false);
          setSuccess(true);
          setTimeout(() => {
            window.localStorage.setItem('token', data.data);
            window.localStorage.setItem('logged', true)
            window.location.href = '/Profile'
          }, 1000);
        } else {
          setFail(true);
          setSuccess(false);
        }
      })
  }

  function toggleShow() {
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
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <header><h3>Login to your account</h3></header>
        <form onSubmit={handleSubmit}>
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
              required
              onChange={e => setPassword(e.target.value)}
            />
            <span className='show-container'>
              <i id='eye' className="fa fa-eye" aria-hidden="true" onClick={toggleShow} />
            </span>
          </div>
          <div>
            <button type='submit'>
              LOG IN
            </button>
            <span className='cliffhanger'>
              Not registered? <Link className='link' href='/SignUp'>Sign Up!</Link>
            </span>
          </div>
          {fail ? <p className='fail'>Email or Password is incorrect!</p> : <Fragment />}
          {success ?
            <p className='success'>Success: Redirecting to Profile...</p>
            : <Fragment />}
        </form>
        <footer>Note: this page has the only purpose to show how the login api works</footer>
      </div>
    </div>
  )
}

export default SignIn;
