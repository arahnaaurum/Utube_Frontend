import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Commentform } from "./Commentform";
import { setComments }  from "../store/comment/actions";
import '../styles/Comments.css';


export function Comments() {
  let params = useParams();
  let video_id = params.id;
  const [video, setVideo] = useState();
  const { id, authorId, isBanned } = useSelector((state) => state.profile);
  const { listOfAuthors } = useSelector((state) => state.author);
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

  }, []);

  async function deleteComment(commentId, commentAuthor) {
    if (commentAuthor == authorId) {
      const rawResponse = await fetch(`http://127.0.0.1:8000/api/comment/${commentId}/`, { method: 'DELETE' })
      const newCommentsRawResponse = await fetch(`http://127.0.0.1:8000/api/comment/?video_id=${video_id}`);
      const newComments = await newCommentsRawResponse.json();
      dispatch(setComments(newComments['results']));
    }
  }

  if (video && listOfComments!==[] && listOfAuthors!==[]) {
    listOfComments.forEach(comment => {
      let authorObj = listOfAuthors.filter(function (author) { return author.id == comment.author })[0];
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
              {comment.author == authorId && <button className='comment_delete_button' onClick={() => { deleteComment(comment.id, comment.author) }}>Delete</button>}
            </div>
          </div>
        })
      }
      {!isBanned && <Commentform authorId={authorId} />  
      }
    </div>
  } else {
    return <div className='comment_container'>
      Loading comments
    </div>
  }
}