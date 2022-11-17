// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import Profile from './components/Profile';

// const logged = localStorage.getItem('logged')

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div className='auth-wrapper'>
//           <div className='auth-inner'>
//             <Routes>
//               <Route exact path='/' element={logged ? <Profile /> : <Login />} />
//               <Route path='/sign-in' element={<Login />} />
//               <Route path='/sign-up' element={<SignUp />} />
//               <Route path='/profile' element={<Profile />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }
import React, { Component, Fragment, useState } from 'react'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/login-user', {
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
        if (data.status === 'ok') {
          setSuccess(true);
          setTimeout(() => {
            window.localStorage.setItem('token', data.data);
            window.localStorage.setItem('logged', true)
            window.location.href = './profile'
          }, 1000);
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
              Not registered? <a href='/sign-up'> Sign Up!</a>
            </span>
          </div>
          {success ?
            <p className='success'>Success: Redirecting to Profile...</p>
            : <Fragment />}
        </form>
        <footer>Note: this page has the only purpose to show how the login api works</footer>
      </div>
    </div>
  )
}

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       email: '',
//       password: '',
//       success: false
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const { email, password } = this.state
//     fetch('http://localhost:3001/login-user', {
//       method: 'POST',
//       crossDomain: true,
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'ok') {
//           this.setState({ success: true });
//           setTimeout(() => {
//             window.localStorage.setItem('token', data.data);
//             window.localStorage.setItem('logged', true)
//             window.location.href = './profile'
//           }, 1000);
//         }
//       })
//   }

//   toggleShow() {
//     if (show) {
//       document.getElementById('password')
//         .setAttribute('type', 'password');
//       document.getElementById('eye').style.color = '#7a797e';
//       show = false;
//     } else {
//       document.getElementById('password')
//         .setAttribute('type', 'text');
//       document.getElementById('eye').style.color = '#5887ef';
//       show = true;
//     }
//   }


//   render() {
//     return (
//       <div className='container'>
//         <div className='form-container'>
//           <header><h3>Login to your account</h3></header>
//           <form onSubmit={this.handleSubmit}>
//             <input
//               type='email'
//               placeholder='Email'
//               required
//               onChange={e => this.setState({ email: e.target.value })}
//             />
//             <div className='password-container'>
//               <input
//                 id='password'
//                 type='password'
//                 placeholder='Password'
//                 required
//                 onChange={e => this.setState({ password: e.target.value })}
//               />
//               <span className='show-container'>
//                 <i id='eye' className="fa fa-eye" aria-hidden="true" onClick={this.toggleShow} />
//               </span>
//             </div>
//             <div>
//               <button type='submit'>
//                 LOG IN
//               </button>
//               <span className='cliffhanger'>
//                 Not registered? <a href='/sign-up'> Sign Up!</a>
//               </span>
//             </div>
//             {this.state.success === true ?
//               <p className='success'>Success: Redirecting to Profile...</p>
//               : <Fragment />}
//           </form>
//           <footer>Note: this page has the only purpose to show how the login api works</footer>
//         </div>
//       </div>
//     )
//   }
// }

export default Login;