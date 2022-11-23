import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setVideo } from "../store/video/actions";
import '../styles/VideoForm.css';


export function VideoForm() {
    const { id, authorId } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [file, setFile] = useState(null);

    async function loadVideo(event) {
        event.preventDefault();

        let formData = new FormData();

        formData.append('author', authorId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('hashtags', `{ ${hashtags} }`);
        
        if (file !== null) {
            formData.append('file', file)
        }

        const response = await fetch('http://127.0.0.1:8000/api/video/', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result);

        const newVideosRawResult = await fetch(`http://127.0.0.1:8000/api/video/`)
        const newVideosResult = await newVideosRawResult.json();
        dispatch(setVideo(newVideosResult['results']));

        handleClear();
    }
        
    const handleClear = () =>  {
        setTitle('');
        setDescription('');
        setHashtags('');
        setFile(null);
    }

    return <div className='video-form-container'>
        Load your video:
        {authorId ? <form className="video-form" onSubmit={loadVideo}>
            <input className="video-form-field" type='text' value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)}></input>
            <input className="video-form-field" type='text' value={description} placeholder="Description" onChange={(event) => setDescription(event.target.value)}></input>
            <input className="video-form-field" type='file' value={file} onChange={(event) => setFile(event.target.files[0])}></input>
            <input className="video-form-field" type='text' value={hashtags} placeholder="Hashtags" onChange={(event) => setHashtags(event.target.value)}></input>
            <button className="video-form-button" type="submit">Load Video</button>
        </form>
            :
            <p>Become our author to load videos</p>
        }
    </div>
}