import React from 'react';
import { useDispatch } from "react-redux";
import { setVideo } from "../store/video/actions";
import '../styles/VideoDeleteButton.css';


export function VideoDeleteButton(props) {
    const video_id = props.videoId;
    const dispatch = useDispatch();

    async function deleteVideo() {
        const response = await fetch(`http://127.0.0.1:8000/api/video/${video_id}/`, {method: 'DELETE'});

        const newVideosRawResult = await fetch(`http://127.0.0.1:8000/api/video/`)
        const newVideosResult = await newVideosRawResult.json();
        dispatch(setVideo(newVideosResult['results']));
    }

    return <>
        <button className='video-delete-button' onClick={deleteVideo}>Delete</button>
    </>
}