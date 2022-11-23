import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setVideo, filterVideo } from "./store/video/actions";
import { setUser, setAuthor } from "./store/profile/actions";
// components
import { Videos } from "./components/Videos";
import { VideoForm } from "./components/VideoForm";
import { Subscription } from "./components/Subscription";
import { Comments } from "./components/Comments";


function App() {
  const { id, authorId } = useSelector ((state) => state.profile);
  const { listOfVideos } = useSelector ((state) => state.video);
  const dispatch = useDispatch();
  const [ error, setError] = useState();
  const [query, setQuery] = useState('');

  function toggleMenu () {
    let menu = document.querySelector('.header_menu');
    menu.classList.toggle("hidden");
  }
  
  async function searchForVideos (event) {
    event.preventDefault();
    const rawResponse = await fetch(`http://127.0.0.1:8000/api/video/?query=${query}`);
    let result = await rawResponse.json();
    console.log(result);
    dispatch(filterVideo(result['results']));
}

useEffect(()=> {
    fetch('/api/current')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(`Something went wrong: code ${response.status}`)
      }
    })
    .then((data) => {
      let userId = data['results'][0].id;
      dispatch(setUser((userId)));
      fetch(`http://127.0.0.1:8000/api/author/?user_id=${userId}`)
        .then(response => response.json())
        .then((result) => {
          let thisAuthorId = result['results'][0].id;
          dispatch(setAuthor(thisAuthorId));
});

    })
    .catch(error => {
      setError('Error')
    })

    fetch(`http://127.0.0.1:8000/api/video/`)
      .then(response => response.json())
      .then((result) => {
      dispatch(setVideo(result['results']));
    });
}, []);

  return (
      <div className="App">
        <header className="App-header">
          <a className='header_title' href='http://127.0.0.1:3000/'><h1>UTUBE</h1></a>
          <svg className='header_button' onClick={toggleMenu} width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l9 6-9 6z"/></svg>
          <div className='header_menu hidden'>
            <ul className='header_list'>
              <li className='header_link'><Link className='header_link_inner' to="subscription">Recommended</Link></li>
              <li className='header_link'><a className='header_link_inner' href='http://127.0.0.1:8000/personal/'>Personal Page</a></li>
              <li className='header_link'><a className='header_link_inner' href='http://127.0.0.1:8000/public/'>Public chats</a></li>
            </ul>
              <form className="video-search-form" onSubmit={searchForVideos}>
                  <input className="video-search-form-field" type='text' placeholder="Search for video" onChange={(event) => setQuery(event.target.value)}></input>
                  <button className="video-search-form-button" type="submit">Search</button>
              </form>
          </div>
        </header>
        <main className="App-main">
          <Routes>
            <Route path='/' element = {<Videos/>}/>
            <Route path='subscription' element = {<Subscription />}/>
            <Route path='comments/:id' element = {<Comments />}/>
          </Routes>
        </main>
        <footer className="App-footer">
        <VideoForm/>
        </footer>
      </div>
    
  );
}

export default App;
