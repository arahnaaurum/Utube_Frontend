import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../store/like/actions";
import '../styles/Videos.css';

export function Like(props) {
    const videoId = props.videoId;
    const { id, authorId } = useSelector((state) => state.profile);
    const { listOfLikes } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    async function addLike() {
        let checkIfLikeExists = listOfLikes.filter(function (like) { return (like.video == videoId && like.author == authorId) })[0]
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

            fetch(`http://127.0.0.1:8000/api/like`)
                .then(response => response.json())
                .then((result) => {
                    dispatch(setLikes(result['results']));
                })
        } else {
            console.log('Like exists');
        }
    }

    async function deleteLike() {
        const rawResponse = await fetch(`http://127.0.0.1:8000/api/like/?author_id=${authorId}&video_id=${videoId}`);
        let result = await rawResponse.json();
        let like = result['results'][0];
        if (like) {
            const deleteLike = await fetch(`http://127.0.0.1:8000/api/like/${like.id}/`, { method: 'DELETE' });
        } else {
            console.log('No like from you');
        }

        fetch(`http://127.0.0.1:8000/api/like/`)
            .then(response => response.json())
            .then((result) => {
                dispatch(setLikes(result['results']));
            })
    }

    return <>
        {id && <svg onClick={() => { addLike() }} className='like_svg' version="1.0" width="13pt" height="12pt" viewBox="0 0 1280.000000 1189.000000" preserveAspectRatio="xMidYMid meet">
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
        <svg onClick={() => { deleteLike() }} className='dislike_svg' version="1.0" width="13pt" height="12pt" viewBox="0 0 1280.000000 1189.000000" preserveAspectRatio="xMidYMid meet">
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
    </>

}