import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import httpClient from "../httpClient";

export default function () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect( () => {
        (async() => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                //setUser(resp.data);
                window.location.href="/";
            }
            catch {

            }
        })();
    } );

    const loginUser = async () => {
        try {
            const response = await httpClient.post("//localhost:5000/login", {email, password});
            window.location.href="/";
        }
        catch(error) {
            if(error.response.status == 401) {
                console.log("invalid credentials.");
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
                    <div style={ {color:"white", fontSize:"1.5em", fontWeight:"bold" }}>Welcome back!</div>
                    <div>We're so excited to see you again!</div>
                    <form>
                        <span>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span>
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <p><a>Forgot your password?</a></p>
                        <button type="button" onClick={loginUser}>Login</button>
                        <p>Need an account? <a>Register</a></p>
                    </form>
                </div>
            </div>
        </>
    );
}