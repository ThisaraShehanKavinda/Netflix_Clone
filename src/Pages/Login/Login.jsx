import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { login, signup } from '../../firebase'
import './Login.css'

const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign Up") {
      await signup(name, email, password);
    } else {
      await login(email, password);
    }
    setLoading(false);
  }

  return (
    loading?<div className="loggin-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Your name' />}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ?
            <p>New to Netflix? <span onClick={() => { setSignState("Sign Up") }}>Sign Up Now</span></p> :
            <p>Already have an account? <span onClick={() => { setSignState("Sign In") }}>Sign In Now</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
