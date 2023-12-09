import React from 'react';
import style from "./camChat.module.css";
import giphy from "../images/giphy.gif"
export default function() {
    return(
        <>
            <div className={style.main}>
                <div  className={style.navbar}>Omegle</div>
                <div className={style.cam1}>
.
                </div>
                <div className={style.cam2} style={{backgroundImage:giphy}} >
                </div>
                <div className={style.textChat} >
                    
                </div>
            </div>
        </>
    )
}