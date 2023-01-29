import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const EditProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        createdAt: ''
    });

    const [currentUser, setCurrentUser] = useState();

    let { getUser, editUser } = useContext(UserContext);

    let navigate = useNavigate();

    function isLoggedIn() {
        let user = localStorage.getItem('currentUser')
        setCurrentUser(user);
    }

    useEffect(() => {
        async function fetch() {
            await getUser(currentUser).then((user) => setUser(user));
        }
        isLoggedIn();
        fetch();
    }, [getUser, currentUser]);

    function handleChange(event) {
        setUser((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value };
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editUser(user)
            .then(() => {
                navigate(`/users/${currentUser}`);
            })
            .catch(error => {
                console.log(error);
                window.alert('Failed to update :(');
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <br></br>
            <br></br>

            <span>First Name: </span>
            <input
                placeholder="Enter First Name"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
            />
            <br></br>
            <br></br>
            <span>Last Name: </span>
            <input
                placeholder="Enter Last Name"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
            />
            <br></br>
            <br></br>
            <span>City: </span>
            <input
                placeholder="Enter City"
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
            />
            <br></br>
            <br></br>
            <span>State: </span>
            <input
                placeholder="Enter State"
                type="text"
                maxLength={2}
                name="state"
                value={user.state}
                onChange={handleChange}
            />
            <br />
            <br />
            <button className="submit-btn">Update</button>
        </form>
    )
}

export default EditProfile;