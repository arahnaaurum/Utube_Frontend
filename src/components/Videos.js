import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubscriptionButton } from './SubscriptionButton';
import { VideoDeleteButton } from './VideoDeleteButton';
import '../styles/Videos.css';
import { Like } from './Like';


export function Videos() {
    const { id, authorId, isBanned } = useSelector((state) => state.profile);
    const { listOfVideos } = useSelector((state) => state.video);
    const { listOfLikes } = useSelector((state) => state.like);
    const { listOfAuthors } = useSelector((state) => state.author);

    if (listOfVideos != [] && listOfAuthors != [] && listOfLikes != []) {
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
                        <div className='video_container' key={video.id}>
                            <video className='video_video' src={video.file} controls></video>
                            <div className='video_info'>
                                {id ?
                                    <Link to={'private/' + video.user_identity + '/'}><img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img></Link>
                                    :
                                    <img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img>
                                }
                                {/* <a href={'http://127.0.0.1:8000/private/' + video.user_identity + '/'}><img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img></a> */}
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
