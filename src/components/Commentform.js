import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setComments }  from "../store/comment/actions";


export function Commentform (props) {
    let params = useParams();
    let video_id = params.id;
    const id = props.authorId;

    const [comment, setComment] = useState('');
    
    const dispatch = useDispatch();

    async function handleSubmit(event) { 
        event.preventDefault();
        const rawResponse = await fetch(`http://127.0.0.1:8000/api/comment/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: id,
                video: video_id,
                text: comment,
            })
        });
        
        const newCommentsRawResponse = await fetch(`http://127.0.0.1:8000/api/comment/?video_id=${video_id}`);
        const newComments = await newCommentsRawResponse.json();
        dispatch(setComments(newComments['results']));
        setComment('');

        // fetch(`http://127.0.0.1:8000/api/comment/?video_id=${video_id}`)
        // .then(response => response.json())
        // .then((result) => {
        //     dispatch(setComments(result['results']));
        //     setComment('');
        // });
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input className="comment-form-field" type='text' placeholder="Comment" value={comment} onChange={(event) => setComment(event.target.value)}></input>
            <button className="comment-form-button" type="submit">Post Comment</button>
        </form>
      );
}
