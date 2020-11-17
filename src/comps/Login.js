import React, {useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs} from './Inputs'

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="loginpage"> 
      <div className="logincont">
        <div className="spacer"></div>
        <h3 className="logocont"><div className="logo"></div><span>voicex</span></h3>
        <i class="fas fa-user-alt mainlogicon"></i>
        <h3>Login</h3>
        <form>
          <Inputs title="Email" placeholder="Email" onchange={() => setEmail()}/>
          <Inputs title="Password" type="password" placeholder="Password" onchange={() => setPassword()}/>
        </form>
        <Link to="/"><button onClick={() => props.allowaccess()}>Log in</button></Link>
        <small>Don't have an account? <Link to="/register">Create Account</Link></small>
        <div className="spacers"></div>
      </div>
    </div>
  )
}

export default Login 