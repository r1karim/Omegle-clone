import { BrowserRouter } from "react-router-dom"
import Button from "./Button/Button.jsx"

function App() {
  const styles={
    display:"flex",
    flexDirection:"column",
    margin:"10px"
  }
  return (
    <>
      <div className="main">
        <div class="side">
          <div className="title">
            <h1>Start chatting now!</h1>
            <input placeholder="Add your interests (Optional)" />

            <div style={styles}>
              <Button text="Video chat" color="orange"></Button>
              <Button text="Text chat" color="orange"></Button>
            </div>

          </div>
        </div>
        <div class="section">
          <h4>About us</h4>
          This is an omegle copycat made by the great developer adri711 with the intention of creating a safer platform where you can chat anonymously as well as safely.
          <h4>what do we offer?</h4> To rid you of bots and ban evaders we made this website user-account based which means you're required to create and login to your account to use our services. Within chats you're completely anonymous but you get an option to reveal your user to the other end. We also offer direct messages between befriended users.
          Our chats will be moderated by AI, nudity and/or any NSFW activities won't be tolerated! Keep it clean. 
          <h4>Your chat history</h4>
          <div className="chatHistory">
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>
            <div>You had a video chat from 09-12-2023 23:12:10 till 09-12-2023 23:18:23</div>


          </div>
        </div>


      </div>
    </>
  )
}

export default App
