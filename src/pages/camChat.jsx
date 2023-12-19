import React , { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import style from "./camChat.module.css";
import loading from "../images/loading.gif"
import bg from "../images/ttbg.jpg"

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:5173/",
    },
});

export default function() {
    const [socketInstance, setSocket] = useState(socket);
    const [messages, setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const [anon, setAnon] = useState(null);
    const listMessages = messages.map(message => <div>
        {message.sender ? <span style={{display:"inline", color:"skyblue"}}>You: </span> : <span style={{display:"inline", color:"red"}}>Anonymous: </span>} 
        {message.content}</div> );

    function sendMessage(e) {
        if(e.keyCode == 13) {
            socket.emit("chat", {"type": "chat", content:message});
            setMessage("");
        }
    }

    socket.emit("join_queue");
    useEffect(() => {

        socketInstance.on('chat', (data) => {
            console.log(data);
            if(!anon) {
                setAnon(true);
            }
            else {
                if(data.type == "room_closure") {
                    setAnon(null);
                    socket.emit("join_queue");
                    setMessages([]);
                }
                else if (data.type == "message") {
                    setMessages([...messages, data])
                }
            }
        });

        return ()=>socketInstance.off("chat");
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
                        <button>Diconnect</button> <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sendMessage} /> <button>Send message</button>
                    </div>
                </div>
            </div>
        </>
    )
}