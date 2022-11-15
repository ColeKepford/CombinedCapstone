import React, {useState} from 'react'
import '../CSS/style.css';
import {Link} from "react-router-dom";
import Register from './Register';

function LoginPage({ Login, error}) {
    //details that are being sent over
    const [details, setDetails] = useState({username: "", password: ""})
    //handler that handles the submit button
    const submitHandler = async e => {
        e.preventDefault();


        Login(details);
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div className="innerForm">
                {/* //use this to style I guess */}
                <div>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="Username">Username: </label>
                        {/* Set username in details to the username */}
                        <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                    </div>
                   {/*  <div className="form-group"></div>
                        <label htmlFor="name">Email: </label>
    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/> */}
                    <div className="form-group">
                        <label htmlFor="name">Password: </label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    </div>
                </div>
                {/* Display the error if an error is passed */}
                <br></br>
                {(error != "") ? (<div className="error">{error}</div>) : ""}
                <br></br>
                <input className="button" type="submit" value="Login" style={{width:"200px"}}></input>
                <a><Link to="/register" className="button reg-button" style={{backgroundColor:"transparent", border:"2px solid #e85a4f", color:"red"}}>Register</Link></a>

            </div>
        </form>
    )
}

export default LoginPage
