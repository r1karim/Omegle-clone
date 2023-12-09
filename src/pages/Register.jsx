import style from "./Login.module.css";

export default function () {
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
                            <input />
                        </span>
                        <span>
                            <label>Username</label>
                            <input />
                        </span>
                        <span>
                            <label>Password</label>
                            <input/>
                        </span>
                        <p><a>Already have an account?</a></p>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}