import React, { useState, useEffect } from 'react';
import '../styles/Videos.css';
import { useDispatch, useSelector } from "react-redux";
import { setVideo, getSubVideo } from "../store/video/actions";
import { VideoCard } from './VideoCard';

export function Subscription() {
  const dispatch = useDispatch();
  const { listOfSubVideos } = useSelector((state) => state.video);
  const { authorId } = useSelector((state) => state.profile);
  const { listOfLikes } = useSelector((state) => state.like);
  const { listOfAuthors } = useSelector((state) => state.author);
  const [error, setError] = useState();

  useEffect(() => {
    if (authorId !== null) {
      fetch(`http://127.0.0.1:8000/api/video/?subscriber_id=${authorId}`)
        .then(response => response.json())
        .then((result) => {
          dispatch(getSubVideo(result['results']));
        });
      return () => {
        dispatch(getSubVideo([]));
      }
    }
  }, [])

  if (listOfSubVideos.length !== 0 && listOfAuthors.length !== 0 && listOfLikes.length !== 0) {
    listOfSubVideos.forEach(video => {
      let authorObj = listOfAuthors.filter(function (author) { return author.id == video.author })[0];
      video.profile_pic = authorObj.profile_pic;
      video.user_identity = authorObj.identity;

      let likeArray = listOfLikes.filter(function (like) { return like.video == video.id });
      let likeCount = likeArray.length;
      video.likeCount = likeCount;
    })
    return (
      <div>
        <div className="videos_container">
          {listOfSubVideos.map((video) => {
            return <>
              <VideoCard video={video} key={video.id} />
            </>
          })}
        </div>
      </div>
    );
  } else if (authorId) {
    return (
      <div>
        <div className="videos_container">
          Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="videos_container">
          Please login to see the recomended videos
        </div>
      </div>
    );
  }
}