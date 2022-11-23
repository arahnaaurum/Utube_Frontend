import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Commentform } from "./Commentform";
import { setComments }  from "../store/comment/actions";
import '../styles/Comments.css';


export function Comments() {
  let params = useParams();
  let video_id = params.id;

  const [id, setId] = useState('');
  const [error, setError] = useState();
  const [video, setVideo] = useState();
  const [listOfAuthors, setListOfAuthors] = useState();

  const { listOfComments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/video/${video_id}`)
      .then(response => response.json())
      .then((result) => {
        setVideo(result)
      })

    fetch(`http://127.0.0.1:8000/api/comment?video_id=${video_id}`)
      .then(response => response.json())
      .then((result) => {
        dispatch(setComments(result['results']))
      })

    fetch(`http://127.0.0.1:8000/api/author/`)
      .then(response => response.json())
      .then((result) => {
        setListOfAuthors(result)
      })

    fetch('/api/current')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Something went wrong: code ${response.status}`)
        }
      })
      .then((data) => {
        setId(data['results'][0].id)
      })
      .catch(error => {
        setError('Error')
      })
  }, []);

  async function deleteComment(commentId, commentAuthor) {
    if (commentAuthor == id) {
      const rawResponse = await fetch(`http://127.0.0.1:8000/api/comment/${commentId}/`, { method: 'DELETE' })

      const newCommentsRawResponse = await fetch(`http://127.0.0.1:8000/api/comment/?video_id=${video_id}`);
      const newComments = await newCommentsRawResponse.json();
      dispatch(setComments(newComments['results']));
    }
  }

  if (video && listOfComments && listOfAuthors) {
    listOfComments.forEach(comment => {
      let authorObj = listOfAuthors['results'].filter(function (author) { return author.id == comment.author })[0];
      comment.profile_pic = authorObj.profile_pic;
    });

    return <div className='comments_container'>
      <h2 className='comments_title'>Comments to video <span style={{ color: "darkcyan" }}>{video.title} </span></h2>
      {
        listOfComments.map((comment) => {
          return <div className='comment_container'>
            <div className='comment_container_inner'>
              <img className='comment_profilepic' src={comment.profile_pic} width='90' height='90' alt='profile picture'></img>
              <p className='comment_text'>{comment.text}</p>
              {comment.author == id && <button className='comment_delete_button' onClick={() => { deleteComment(comment.id, comment.author) }}>Delete</button>}
            </div>
          </div>
        })
      }
      <Commentform authorId={id} />
    </div>
  } else {
    return <div className='comment_container'>
      Loading comments
    </div>
  }
}