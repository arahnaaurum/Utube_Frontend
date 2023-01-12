import React, { useState, useEffect } from 'react';
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '../styles/PublicChat.css';

export function PrivateChatRoom() {
    const params = useParams();
    const counterId = params.id;
    console.log(counterId);

    const { id, profilePic } = useSelector((state) => state.profile);
    const [counterPic, setCounterPic] = useState('');
    const [message, setMessage] = useState('');
    const [previousMessageHistory, setPreviousMessageHistory] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);

    let chatId;
    (id > counterId) ? chatId = Number(String(id) + String(counterId)) : chatId = Number(String(counterId) + String(id));

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/author/?user_id=${counterId}`)
            .then(response => response.json())
            .then((result) => {
                setCounterPic(result['results'][0].profile_pic);
            });

        fetch(`http://127.0.0.1:8000/private/api/msglist/?chat=${chatId}`)
            .then(response => response.json())
            .then((result) => {
                setPreviousMessageHistory(result['results']);
            });
    }, [])

    const username = profilePic;

    const { sendJsonMessage } = useWebSocket('ws://127.0.0.1:8000/ws/private/' + id + '_' + counterId + '/',
        {
            onOpen: () => {
                console.log("Connected!");
            },
            onClose: () => {
                console.log("Disconnected!");
            },
            onMessage: (event) => {
                const data = JSON.parse(event.data);
                setMessageHistory((prev) => prev.concat(data));
            }
        });

    async function sendMessage() {
        sendJsonMessage({
            message,
            username
        });

        let response = await fetch(`http://127.0.0.1:8000/private/api/msglist/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ chatId: chatId, author: id, recepient: counterId, text: message })
        })

        if (response.ok) {
            let result = await response.json();
            setMessage("");
            return result
        } else {
            alert("Ошибка HTTP: " + response.status);
            setMessage("");
        }

    }

    return <div>
        {(previousMessageHistory.length !== 0) ?
            previousMessageHistory.map((message) => {
                return <div className="msgblock" id="msgblock">
                    {message['author']==id ?
                        <img className='profile-pic' src={username} width='90' height='90' alt='profile picture'></img>
                        :
                        <img className='profile-pic' src={counterPic} width='90' height='90' alt='profile picture'></img>
                    }
                    <p>{message['text']}</p>
                </div>
            })
            :
            <div className="msgblock" id="msgblock">
                {(messageHistory.length === 0) ? <p>No messages in this chat yet</p> : null}
            </div>
        }

        {(messageHistory.length !== 0) ?
            messageHistory.map((message) => {
                return <div className="msgblock" id="msgblock">
                    <img className='profile-pic' src={message['username']} width='90' height='90' alt='profile picture'></img>
                    <p>{message['message']}</p>
                </div>
            })
            :
            null
        }

        <div className='input_container'>
            <input className="msginput" id="input" type="text" size="80" placeholder='Message' value={message} onChange={(event) => { setMessage(event.target.value) }}></input>
            <button className="btn_chat" id="submit" type="submit" onClick={sendMessage}> SEND </button>
        </div>
    </div>

}