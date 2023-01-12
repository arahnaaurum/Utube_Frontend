import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAuthor, setIsBanned } from "./store/profile/actions";
import { setVideo, filterVideo } from "./store/video/actions";
import { setLikes } from "./store/like/actions";
import { setAuthors } from "./store/author/actions";
// components
import { Videos } from "./components/Videos";
import { VideoForm } from "./components/VideoForm";
import { Subscription } from "./components/Subscription";
import { Comments } from "./components/Comments";
import { PublicChatList } from "./components/PublicChatList";
import { PublicChatRoom } from './components/PublicChatRoom';
import { PrivateChatRoom } from './components/PrivateChatRoom';


function App() {
  const { isBanned } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [formUsername, setFormUsername] = useState();
  const [formPassword, setFormPassword] = useState();

  const csrftoken = getCookie('csrftoken');

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function toggleMenu() {
    let menu = document.querySelector('.header_menu');
    menu.classList.toggle("hidden");
  }

  async function searchForVideos(event) {
    event.preventDefault();
    const rawResponse = await fetch(`http://127.0.0.1:8000/api/video/?query=${query}`);
    let result = await rawResponse.json();
    console.log(result);
    dispatch(filterVideo(result['results']));
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/author/`)
      .then(response => response.json())
      .then((result) => {
        dispatch(setAuthors(result['results']));
      });

    fetch(`http://127.0.0.1:8000/api/video/`)
      .then(response => response.json())
      .then((result) => {
        dispatch(setVideo(result['results']));
      });

    fetch(`http://127.0.0.1:8000/api/like/`)
      .then(response => response.json())
      .then((result) => {
        dispatch(setLikes(result['results']));
      })

  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://127.0.0.1:8000/api/current/')
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error(`Something went wrong: code ${response.status}`)
          }
        })
        .then((data) => {
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
            });
        })
        .catch(error => {
          setError('Error');
          setIsLoggedIn(false);
        })
    }
  }, [isLoggedIn])

  function submitHandler(event) {
    event.preventDefault();
    fetch(
      'http://127.0.0.1:8000/personal/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          username: formUsername,
          password: formPassword,
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Something went wrong: code ${response.status}`)
        }
      })
      .then(({ key }) => {
        setIsLoggedIn(true);
        setError(null);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <a className='header_title' href='http://127.0.0.1:3000/'><h1>UTUBE</h1></a>
        <svg className='header_button' onClick={toggleMenu} width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l9 6-9 6z" /></svg>
        <div className='header_menu hidden'>
          <ul className='header_list'>
            <li className='header_link'><Link className='header_link_inner' to="subscription">Recommended</Link></li>
            <li className='header_link'><Link className='header_link_inner' to="public">Public Chats</Link></li>
            <li className='header_link'><a className='header_link_inner' href='http://127.0.0.1:8000/personal/'>Personal Page</a></li>
          </ul>
          <form className="video-search-form" onSubmit={searchForVideos}>
            <input className="video-search-form-field" type='text' placeholder="Search for video" onChange={(event) => setQuery(event.target.value)}></input>
            <button className="video-search-form-button" type="submit">Search</button>
          </form>
        </div>
      </header>
      <main className="App-main">
        {isLoggedIn===null ?
          <form className="loginForm" onSubmit={submitHandler}>
            <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username" />
            <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password" />
            <input type="submit" name="submit" value="Войти" />
          </form>
          : <div> You are logged in</div>
        }
        <Routes>
          <Route path='/' element={<Videos />} />
          <Route path='subscription' element={<Subscription />} />
          <Route path='comments/:id' element={<Comments />} />
          <Route path='public' element={<PublicChatList />} />
          <Route path='public/:name' element={<PublicChatRoom />} />
          <Route path='private/:id' element={<PrivateChatRoom />} />
        </Routes>
      </main>
      <footer className="App-footer">
        {!isBanned && <VideoForm />}
      </footer>
    </div>

  );
}

export default App;
