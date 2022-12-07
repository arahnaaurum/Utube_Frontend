import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../styles/LoginForm.css';
import { setUser, setAuthor, setIsBanned } from "../store/profile/actions";
import Cookies from 'universal-cookie';

export function LoginForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [formUsername, setFormUsername] = useState();
    const [formPassword, setFormPassword] = useState();

    const { id, authorId, isBanned } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const cookies = new Cookies();

    // async function DoCheckSession () {
    //     const raw = await fetch('http://127.0.0.1:8000/api/current/', {
    //                     method: 'GET',
    //                     credentials: 'include',
    //                 })
    
    //     const resp = await raw.json();
    //     console.log (resp);
    // }

    useEffect(() => {
        if (!isLoggedIn) {
            fetch('http://127.0.0.1:8000/api/current/', {
                method: 'GET',
                credentials: 'include',
            })
                .then(response => {
                    if (response.status!==403) {
                        return response.json()
                    } else {
                        console.log('You are not logged in');
                    }
                })
                .then((data) => {
                    if (data) {
                        let userId = data['results'][0].id;
                        console.log(userId);
                        dispatch(setUser((userId)));
                        fetch(`http://127.0.0.1:8000/api/author/?user_id=${userId}`)
                            .then(response => response.json())
                            .then((result) => {
                                let thisAuthorId;
                                let thisAuthorPicture;
                                if (result['results'][0].is_banned) {
                                    alert('You are currently banned and may not use some of the site functions');
                                    dispatch(setIsBanned());
                                }
                                thisAuthorId = result['results'][0].id;
                                thisAuthorPicture = result['results'][0].profile_pic;
                                let payload = { "id": thisAuthorId, "picture": thisAuthorPicture };
                                dispatch(setAuthor(payload));
                                setIsLoggedIn(true);
                            });
                    }
                })
        }
    }, [])

    async function submitHandler(event) {
        event.preventDefault();
        const loginRawResponse = await fetch('http://127.0.0.1:8000/personal/login/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRFToken': `${cookies.get('csrftoken')}`,
                },
                body: JSON.stringify({
                    username: formUsername,
                    password: formPassword,
                })
            })
        const loginResult = await loginRawResponse.json();
        let userId = loginResult['data']['id'];
        if (userId) {
            dispatch(setUser((userId)));
            let rawResponse = await fetch(`http://127.0.0.1:8000/api/author/?user_id=${userId}`);
            let result = await rawResponse.json();
            let thisAuthorId;
            let thisAuthorPicture;
            if (result['results'][0].is_banned) {
                alert('You are currently banned and may not use some of the site functions');
                dispatch(setIsBanned());
            }
            thisAuthorId = result['results'][0].id;
            thisAuthorPicture = result['results'][0].profile_pic;
            let payload = { "id": thisAuthorId, "picture": thisAuthorPicture };
            dispatch(setAuthor(payload));
        }

        setIsLoggedIn(true);
        setFormUsername('');
        setFormPassword('');
    }

    return <div className='login-form-container'>
        {isLoggedIn === null ?
            <form className="login-form" onSubmit={submitHandler}>
                <input className="login-form-field" type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username" />
                <input className="login-form-field" type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password" />
                <button className="login-form-button">Login</button>
            </form>
            : null
        }
                
                {/* <button onClick={DoCheckSession}>CheckSessioninfo</button> */}
    </div>
}