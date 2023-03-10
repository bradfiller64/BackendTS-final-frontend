import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/posts');
        }).catch(error => {
            console.log(error);
            window.alert('Login Failed :(');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>Username  </span>
            <input placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <span>Password  </span>
            <input placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <button className="submit-btn">
                Sign In
            </button>
        </form>
    );
};

export default SignIn;