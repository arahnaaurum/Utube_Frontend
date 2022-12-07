import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubscriptionButton } from './SubscriptionButton';
import { VideoDeleteButton } from './VideoDeleteButton';
import { VideoCard } from './VideoCard';
import '../styles/Videos.css';
import { Like } from './Like';


export function Videos() {
    const { listOfVideos } = useSelector((state) => state.video);
    const { listOfLikes } = useSelector((state) => state.like);
    const { listOfAuthors } = useSelector((state) => state.author);

    if (listOfVideos.length !== 0 && listOfAuthors.length !== 0 && listOfLikes.length !== 0) {
        listOfVideos.forEach(video => {
            let authorObj = listOfAuthors.filter(function (author) { return author.id == video.author })[0];
            video.profile_pic = authorObj.profile_pic;
            video.user_identity = authorObj.identity;

            let likeArray = listOfLikes.filter(function (like) { return like.video == video.id });
            let likeCount = likeArray.length;
            video.likeCount = likeCount;
        });

        return (
            <div className='videos_container'>
                {listOfVideos.map((video) => {
                    return <>
                       <VideoCard video={video} key={video.id}/>
                    </>
                })}
            </div>
        )
    } else {
        return
        <div className='videos_container'>
            Loading...
        </div>
    }
}
