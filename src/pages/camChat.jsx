import React , { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import style from "./camChat.module.css";
import loading from "../images/loading.gif"
import bg from "../images/ttbg.jpg"

const initial_messages = [
    {key:1,sender: true, content:"M20"},
    {key:2,sender: false, content:"F11"},
    {key:3,sender:true,  content:"wyd"},
    {key:4,sender:false, content: "nigger"}
];
const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:5173/",
    },
});
export default function() {
    const [messages, setMessages] = useState(initial_messages);
    const [anon, setAnon] = useState(null);
    const listMessages = messages.map(message => <div>
        {message.sender ? <span style={{display:"inline", color:"skyblue"}}>You: </span> : <span style={{display:"inline", color:"red"}}>Anonymous: </span>} 
        {message.content}</div> );
    
    useEffect(() => {
        socket.on('chat', (data) => {
            if(!anon) {
                setAnon(true);
            }
        });

      });

    return(
        <>
            <div className={style.main} style={{ backgroundImage: `url(${bg})`,  backgroundSize: "200px" }}>
                <div  className={style.navbar}>Omegle</div>
                <div className={style.cam1}>
                    <img src={loading} width={300}></img>
                </div>
                <div className={style.cam2} >
                    <img src={loading} width={300}></img>
                </div>
                <div className={style.textChat} >
                    <div className={style.textBox}>
                    <span> {anon ? "You're in a chat with a random stranger." : "Looking for a match..." }</span>
                    <div className={style.messages}>
                        {listMessages}
                    </div>
                    </div>
                    <div className={style.textInput}>
                        <button>Diconnect</button> <input /> <button>Send message</button>
                    </div>
                </div>
            </div>
        </>
    )
}