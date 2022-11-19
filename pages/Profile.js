import React, { useEffect, useState } from 'react'
import Link from 'next/link';

function Profile() {
    const [userData, setUserData] = useState('');

    useEffect(() => {
        fetch('/api/userData', {
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
            setUserData(data.data);
        })
    }, [])

    function signOut() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('logged');
    }

    return (userData !== undefined ?
        <div className='container'>
            <div className='form-container'>
                <header><h3>Credentials</h3></header>
                Name:<h1>{userData.name}</h1>
                Email:<h1>{userData.email}</h1>
                <Link className='btn-link' href='/'><button onClick={signOut}>SIGN OUT</button></Link>
                <footer>Note: this page has the only purpose to show how the login api works</footer>
            </div>
        </div>
        : <div className='container'>
            <div className='form-container'>
                <header><h3>Error</h3></header>
                <h1>To see your Credentials, you have to login into your account first!</h1>
                <Link className='btn-link' href='/'><button onClick={signOut}>LOGIN</button></Link>
                <footer>Note: this page has the only purpose to show how the login api works</footer>
            </div>
        </div>
    )
}

export default Profile;
