import React from 'react';
import style from "./camChat.module.css";
import loading from "../images/loading.gif"
import bg from "../images/ttbg.jpg"

export default function() {
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
                    <span>You're in a chat with a random stranger.</span>
                    <div className={style.messages}>
                        <div className={style.message}>
                        <span style={{color:'skyblue', display:"inline"}}>You:</span> M20
                        </div>
                        <div className={style.message}>
                        <span style={{color:'red', display:"inline"}}>Stranger:</span> F11
                        </div>
                        <div className={style.message}>
                        <span style={{color:'skyblue', display:"inline"}}>You:</span> so... do you send?
                        </div>
                        <div className={style.message}>
                        <span style={{color:'red', display:"inline"}}>Stranger:</span> Yes
                        </div>
                        <div className={style.message}>
                        <span style={{color:'skyblue', display:"inline"}}>You:</span> snap?
                        </div>
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