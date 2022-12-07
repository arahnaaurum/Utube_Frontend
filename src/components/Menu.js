import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/App.css';
import { useDispatch } from "react-redux";
import { filterVideo } from "../store/video/actions";

export function Menu() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

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

    return <header className="App-header">
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
}