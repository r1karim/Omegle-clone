import Button from "../Button/Button";
import bg from "../images/ttbg.jpg"
import httpClient from "../httpClient";
import react, { useEffect,useState } from "react";

function Home() {
    const styles={
      display:"flex",
      flexDirection:"column",
      margin:"10px"
    }
    const [isLogged, setLogged] = useState(false);
    useEffect( () => {
      (async() => {
          try {
              const resp = await httpClient.get("//localhost:5000/@me");
              setLogged(true);
          }
          catch (error) {
              if(error.response.status == 401) {
                setLogged(false);
              }
          }
      })();
    } );
    const logout = async () => {
      try {
        const response = await httpClient.get("//localhost:5000/logout");
        window.location.href="/";
      }
      catch(error) {
        console.log("Connection error: ", error);
      }
    }
    
    return (
      <>
        <div className="main" style={{ backgroundImage: `url(${bg})`, backgroundSize: "200px"  }} >
          <div className="side">
            <div className="title">
              <h1>Start chatting now!</h1>
              <input placeholder="Add your interests (Optional)" />
  
              <div style={styles}>
                <button onClick={() => { window.location.href = isLogged ? "/video": "/login" }} color="orange">Video chat</button>
                <button onClick={() => { window.location.href = isLogged ? "/video": "/login" }} color="orange">Text chat</button>
              </div>
  
            </div>
          </div>
          <div className="section">
            <h4>About us</h4>
            This is an omegle copycat made by the great developer adri711 with the intention of creating a safer platform where you can chat anonymously as well as safely.
            <h4>what do we offer?</h4> To rid you of bots and ban evaders we made this website user-account based which means you're required to create and login to your account to use our services. Within chats you're completely anonymous but you get an option to reveal your user to the other end. We also offer direct messages between befriended users.
            Our chats will be moderated by AI, nudity and/or any NSFW activities won't be tolerated! Keep it clean. 
            <h4>Your chat history</h4>
            { isLogged && <button type="button" onClick={logout}>Logout</button> }
            { !isLogged && 
              <button type="button" onClick={() => {window.location.href="/login"}}>Login</button>
            }
            { !isLogged && 
              <button type="button" onClick={() => {window.location.href="/register"}} style={{'margin-left': "10px"}}>Register</button>
            }
          </div>
        </div>
      </>
    )
  }

  export default Home;