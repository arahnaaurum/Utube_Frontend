import React, { useState, useEffect } from 'react';
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '../styles/PublicChat.css';

export function PublicChatRoom() {
    const params = useParams();
    const roomName = params.name;
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const { profilePic } = useSelector((state) => state.profile);

    // без пакета "react-use-websocket"
    // const chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/public/' + roomName + '/');
    // chatSocket.onmessage = function (event) {
    //     const data = JSON.parse(event.data);
    //     setMessageHistory((prev) => prev.concat(data));
    // }
    // function sendMessage() {
    //     chatSocket.send(JSON.stringify({
    //         'message': message,
    //         'username': 'Anonymous',
    //     }));
    //     setMessage("");
    // }

    const username = profilePic;
    const { sendJsonMessage } = useWebSocket('ws://127.0.0.1:8000/ws/public/' + roomName + '/',
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

    function sendMessage() {
        sendJsonMessage({
            message,
            username
        });
        setMessage("");
    }


    console.log(messageHistory)

    if (messageHistory.length !== 0) {
        return <div>
            {messageHistory.map((message) => {
                return <div className="msgblock" id="msgblock">
                    <img className='profile-pic' src={message['username']} width='90' height='90' alt='profile picture'></img>
                    <p>{message['message']}</p>
                </div>
            })}
            <div className='input_container'>
                <input className="msginput" id="input" type="text" size="80" placeholder='Message' value={message} onChange={(event) => { setMessage(event.target.value) }}></input>
                <button className="btn_chat" id="submit" type="submit" onClick={sendMessage}> SEND </button>
            </div>
        </div>

    } else {
        return <div>
            <div className="msgblock" id="msgblock"> No messages in this chat yet </div>
            <div className='input_container'>
                <input className="msginput" id="input" type="text" size="80" placeholder='Message' value={message} onChange={(event) => { setMessage(event.target.value) }}></input>
                <button className="btn_chat" id="submit" type="submit" onClick={sendMessage}> SEND </button>
            </div>
        </div>
    }
}