import React, { useEffect, useState } from 'react'

function Profile() {
    const [userData, setUserData] = useState('');

    useEffect(() => {
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
            setUserData(data.data);
        })
    }, [])

    function signOut() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('logged');
        window.location.href = '/';
    }

    return (
        <div className='form-container'>
            <header><h3>Credentials</h3></header>
            Name:<h1>{userData.name}</h1>
            Email:<h1>{userData.email}</h1>
            <button onClick={signOut}>Sign Out</button>
            <footer>Note: this page has the only purpose to show how the login api works</footer>
        </div>
    )

}

export default Profile;
