import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAuthor } from "../store/profile/actions";
import '../styles/SubscriptionButton.css';


export function SubscriptionButton(props) {
    const { id, authorId } = useSelector((state) => state.profile);
    const author = props.author;
    const dispatch = useDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (authorId) {
            fetch(`http://127.0.0.1:8000/api/subscription/?subscriber=${authorId}&author=${author}`)
                .then(response => response.json())
                .then((result) => {
                    if (result.count == 1) {
                        setIsSubscribed(true);
                    } else {
                        setIsSubscribed(false);
                    }
                });
        }
    }, [authorId]);

    async function handleSubscribe() {
        let rawResponse = await fetch('http://127.0.0.1:8000/api/subscription/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subscriber: authorId,
                author: author,
            })
        })
        setIsSubscribed(true);
    }

    async function handleUnsubscribe() {
        let rawResponse = await fetch(`http://127.0.0.1:8000/api/subscription/?subscriber=${authorId}&author=${author}`)
        let result = await rawResponse.json();
        let subscription = result['results'][0];
        let sub_id = subscription.id;
        let unsubscribe = await fetch(`http://127.0.0.1:8000/api/subscription/${sub_id}/`, { method: 'DELETE' });
        setIsSubscribed(false);
    }

    return <>
        {isSubscribed ?
            <button className='subscribe_button' onClick={handleUnsubscribe}>Unfollow author</button> :
            <button className='unsubscribe_button' onClick={handleSubscribe}>Follow author</button>
        }
    </>
}