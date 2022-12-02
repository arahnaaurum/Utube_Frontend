import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../store/publicchat/actions";
import '../styles/PublicChat.css';

export function PublicChatList() {
    const { isBanned } = useSelector((state) => state.profile);
    const { listOfChats } = useSelector((state) => state.public);
    const [name, setName] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/public/api/chatlist/')
            .then(response => response.json())
            .then((result) => {
                (dispatch(setChats((result['results']))));
            });
    }, [])

    async function deleteChat(chatName) {
        await fetch(`http://127.0.0.1:8000/public/api/chatlist/${chatName}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFTOKEN": "{{csrf_token}}"
            }
        }).then(console.log('Chat is deleted!'))

        const response = await fetch('http://127.0.0.1:8000/public/api/chatlist/');
        const result = await response.json();
        dispatch(setChats((result['results'])));
    };

    async function createNewChat(chatName) {
        if (!isBanned && chatName) {
            await fetch(`http://127.0.0.1:8000/public/api/chatlist/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFTOKEN": "{{csrf_token}}"
            },
            body: JSON.stringify({ name: chatName })
        })
        setName('');

        const response = await fetch('http://127.0.0.1:8000/public/api/chatlist/');
        const result = await response.json();
        dispatch(setChats((result['results'])));
        }
    };

    if (listOfChats!==[]) {
        return <div className="main_container">
            <div id="chatlist_container">
            {listOfChats.map((chat) => {
                return <div class="chat_info">
                            <Link className='chat_link' to={chat.name + "/"}>{chat.name}</Link>
                            {/* <div><a className="chat_link" href={"http://127.0.0.1:8000/public/" + chat.name + "/"}>{chat.name}</a></div> */}
                            <button className="btn_chat" onClick={()=>{deleteChat(chat.name)}}>Delete</button>
                        </div>
                })
            }
            </div>
            <input type="text" value={name} id="chatName" onChange={(event)=> {setName(event.target.value)}}></input>
            <button className="btn_chat" onClick={()=>{createNewChat(name)}}>Create chat</button>
        </div>
    } else {
        return
        <div>
            Loading...
        </div>
    }

}