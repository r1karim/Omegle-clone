import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import httpClient from "../httpClient";

export default function () {

    useEffect( () => {
        (async() => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                window.location.href="/";
            }
            catch {

            }
        })();
    } );

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async ( ) => {
        try {
            const response = await httpClient.post("//localhost:5000/register", {username, email , password});
            window.location.href= "/";
        }
        catch(error) {
            if(error.response.status == 401) {
                console.log("error: username or email already in use");
            }
        }
    }

    

    const main= {
        display:"grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        gridColumnGap: "0px",
        gridRowGap: "0px"
    }
    const navbar={
        gridArea:"1 / 1 / 2 / 11",
        padding:"15px", fontSize:"1.5em"
    }
    const loginbox= {
        gridArea:"3 / 3 / 8 / 7",
        backgroundColor:"#1a1818",
        padding:"25px",
        webkitBoxShadow: "0 0.25em 0.75em black"
    }
    return(
        <>
            <div style={main}>
                <div style={navbar}>  Omegle </div>
                <div style={loginbox}>
                    <div style={ {color:"white", fontSize:"1.5em", fontWeight:"bold" }}>Create an account!</div>
                    <div>We're glad to have you join us!</div>

                    <form>
                        <span>
                            <label>Email</label>
                            <input value={email} onChange={ (e) => {setEmail(e.target.value)}} />
                        </span>
                        <span>
                            <label>Username</label>
                            <input value={username} onChange={ (e) => {setUsername(e.target.value)}} />
                        </span>
                        <span>
                            <label>Password</label>
                            <input type= "password" value={password} onChange={ (e) => {setPassword(e.target.value)}} />
                        </span>
                        <p><a>Already have an account?</a></p>
                        <button type="button" onClick={registerUser} >Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}
