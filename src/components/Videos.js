import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SubscriptionButton } from './SubscriptionButton';
import { VideoDeleteButton } from './VideoDeleteButton';
import '../styles/Videos.css';


export function Videos() {
    const { listOfVideos } = useSelector((state) => state.video);
    const { id, authorId } = useSelector((state) => state.profile);
    const [listOfAuthors, setListOfAuthors] = useState();
    const [listOfLikes, setListOfLikes] = useState();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/author/`)
            .then(response => response.json())
            .then((result) => {
                setListOfAuthors(result)
            });

        fetch(`http://127.0.0.1:8000/api/like/`)
            .then(response => response.json())
            .then((result) => {
                setListOfLikes(result)
            })

    }, []);

    async function addLike(videoId, authorId) {
        let checkIfLikeExists = listOfLikes['results'].filter(function (like) { return (like.video == videoId && like.author == authorId) })[0]
        if (!checkIfLikeExists) {
            const rawResponse = await fetch(`http://127.0.0.1:8000/api/like/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: authorId,
                    video: videoId,
                })
            });
            const content = await rawResponse.json();

            fetch(`http://127.0.0.1:8000/api/like`)
                .then(response => response.json())
                .then((result) => {
                    setListOfLikes(result)
                })
        } else {
            console.log('Like exists');
        }
    }

    async function deleteLike(videoId, authorId) {
        const rawResponse = await fetch(`http://127.0.0.1:8000/api/like/?author_id=${authorId}&video_id=${videoId}`);
        let result = await rawResponse.json();
        console.log(result);
        let like = result['results'][0];
        // console.log(like);
        if (like && like.author == authorId) {
            const deleteLike = await fetch(`http://127.0.0.1:8000/api/like/${like.id}/`, { method: 'DELETE' });
        } else {
            console.log('No like from you');
        }

        fetch(`http://127.0.0.1:8000/api/like/`)
            .then(response => response.json())
            .then((result) => {
                setListOfLikes(result)
            })
    }

    if (listOfVideos && listOfAuthors && listOfLikes) {
        listOfVideos.forEach(video => {
            let authorObj = listOfAuthors['results'].filter(function (author) { return author.id == video.author })[0];
            video.profile_pic = authorObj.profile_pic;
            video.user_identity = authorObj.identity;

            let likeArray = listOfLikes['results'].filter(function (like) { return like.video == video.id });
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
                                <a href={'http://127.0.0.1:8000/private/' + video.user_identity + '/'}><img className='video_profilepic' src={video.profile_pic} width='90' height='90' alt='profile picture'></img></a>
                                <SubscriptionButton author={video.author} />
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
                                    {id && <svg onClick={() => { addLike(video.id, id) }} className='like_svg' version="1.0" width="13pt" height="12pt" viewBox="0 0 1280.000000 1189.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)" stroke="none">
                                            <path d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001
                                                -2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360
                                                634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346
                                                -2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178
                                                408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19
                                                196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998
                                                -193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417
                                                -535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535
                                                610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z"/>
                                        </g>
                                    </svg>}
                                    <svg onClick={() => { deleteLike(video.id, id) }} className='dislike_svg' version="1.0" width="13pt" height="12pt" viewBox="0 0 1280.000000 1189.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)" stroke="none">
                                            <path d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001
                                                -2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360
                                                634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346
                                                -2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178
                                                408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19
                                                196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998
                                                -193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417
                                                -535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535
                                                610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z"/>
                                        </g>
                                    </svg>
                                </div>
                            
                            {
                                authorId == video.author?
                                <VideoDeleteButton videoId={ video.id } />
                                : <div/>
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
