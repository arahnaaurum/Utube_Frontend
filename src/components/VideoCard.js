import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubscriptionButton } from './SubscriptionButton';
import { VideoDeleteButton } from './VideoDeleteButton';
import '../styles/Videos.css';
import { Like } from './Like';


export function VideoCard(props) {
    const video = props.video;
    const { id, authorId, isBanned } = useSelector((state) => state.profile);
    return <div className='video_container' key={video.id}>
        <video className='video_video' src={video.file} controls></video>
        <div className='video_info'>
            {id ?
                <Link to={'private/' + video.user_identity + '/'}><img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img></Link>
                :
                <img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img>
            }
            {!isBanned && <SubscriptionButton author={video.author} />}
        </div>
        <h3 className='video_title'>{video.title}</h3>
        <div className='video_description'>
            <p>{video.description}</p>
        </div>
        <div className='video_hashtags'>
            # {video.hashtags.slice(1, -1).split(',').map((hashtag) => {
                return <>
                    {hashtag}
                </>
            })}
        </div>
        <div className='additional_container'>
            <Link className='video_comments_link' to={"comments/" + video.id}>Comments</Link>
            <div className='like_container'>
                Likes: {video.likeCount}
                <Like videoId={video.id} />
            </div>
            {
                authorId == video.author ?
                    <VideoDeleteButton videoId={video.id} />
                    : <div />
            }
        </div>
    </div>
}