import React, { useState, useEffect } from 'react';
import '../styles/Videos.css';
import { useDispatch, useSelector } from "react-redux";
import { setVideo, getSubVideo } from "../store/video/actions";
import { Videos } from "./Videos";


export function Subscription() {
  const dispatch = useDispatch();
  const { listOfVideos } = useSelector((state) => state.video);
  const { authorId } = useSelector((state) => state.profile);

  const [error, setError] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/video/?subscriber_id=${authorId}`)
      .then(response => response.json())
      .then((result) => {
        dispatch(getSubVideo(result['results']));
      });
    return () => {
      dispatch(setVideo([]));
    }
  }, [])

  if (listOfVideos) {
    return (
      <div>
        {error ? <p>{error}</p> :
          <div className="Profile">
            <Videos />
          </div>
        }
      </div>
    );
  } else {
    return (
      <div>
        {error ? <p>{error}</p> :
          <div className="Profile">
            Loading...
          </div>
        }
      </div>
    );
  }

}