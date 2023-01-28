import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import UserContext from '../contexts/UserContext';

const UserProfile = () => {
    let { username } = useParams();
    const [currentUser, setCurrentUser] = useState();

    function isLoggedIn() {
        let user = localStorage.getItem('currentUser')
        setCurrentUser(user);
    }

    let { deletePost } = useContext(PostContext);
    let { getUser } = useContext(UserContext);

    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        createdAt: ''
    })

    useEffect(() => {
        async function fetch() {
            await getUser(username).then((username) => setUser(username));
        }
        isLoggedIn();
        fetch();
    }, [getUser, username]);

    function handleDelete(id) {
        deletePost(id)
            .then(() => {
                navigate(`/users/${username}`)
            })
            .catch((error) => {
                console.log(error);
                navigate('/signin');
            })
    }

    return (
        <>
            <h1>{username}</h1>

        </>
    )
}

export default UserProfile;