import React, {useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs} from './Inputs'
import {signUp} from '../api/index'

const Register = (props) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')

const handleForm = async () => {
    let userData = {email:email, password:password}
    const result = await signUp(userData)
    console.log(result)
  }

  return (
    <div className="loginpage"> 
      <div className="logincont">
        <div className="spacers"></div>
        <h3 className="logocont"><div className="logo"></div><span>voicex</span></h3>
        <i class="fas fa-user-plus mainlogicon"></i>
        <h3>Create Account</h3> 
        <form> 
          <Inputs title="Full Name" placeholder="Your full Name" onchange={e => setName(e)} />
          <Inputs title="Email" placeholder="Your email" onchange={e => setEmail(e)} />
          <Inputs title="Company Name" placeholder="Your company name" onchange={e => setCompany(e)} />
          <Inputs title="Password" type="password" placeholder="Enter a Password" onchange={e => setPassword(e)} />
        </form>
        <button onClick={() => handleForm()}>Create Account</button>
        <small>Already have an account? <Link to="/login">Login</Link></small>
        <div className="spacers"></div>
      </div>
    </div>
  )
}

export default Register