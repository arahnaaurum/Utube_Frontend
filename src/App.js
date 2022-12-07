import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './styles/App.css';
// redux
import { useSelector, useDispatch } from "react-redux";
import { setVideo, filterVideo } from "./store/video/actions";
import { setLikes } from "./store/like/actions";
import { setAuthors } from "./store/author/actions";
// components
import { Menu } from "./components/Menu";
import { Videos } from "./components/Videos";
import { VideoForm } from "./components/VideoForm";
import { Subscription } from "./components/Subscription";
import { Comments } from "./components/Comments";
import { PublicChatList } from "./components/PublicChatList";
import { PublicChatRoom } from './components/PublicChatRoom';
import { PrivateChatRoom } from './components/PrivateChatRoom';
import { LoginForm } from './components/LoginForm';

function App() {
  const { isBanned } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

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

  return (
    <div className="App">
      <Menu/>
      <main className="App-main">
        <LoginForm/>
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
