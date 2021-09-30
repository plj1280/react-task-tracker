import {useState} from 'react'

function Login(props) {

    const [userText, setUserText] = useState("")

    function Loggedout() {
        return(
        <form onSubmit={(event)=>{
            props.setUsername(userText)
            setUserText("")
            props.setLoggedin(true)
            event.preventDefault()
        }
        }>
            <label>
              Username:
              <input type="text" value={userText} onChange={(event)=>setUserText(event.target.value)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
    }

    function Loggedin() {
        return(
        <div>
            Hello {props.username}!
           <button onClick={()=>{
               props.setLoggedin(false)
               props.setUsername("")
           }}>Logout </button>
        </div>
        )
    }

    return(
        <div>
            {props.loggedin ? Loggedin() : Loggedout()}
        </div>

    )
    
}

export default Login