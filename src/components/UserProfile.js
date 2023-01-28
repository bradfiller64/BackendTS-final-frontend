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

            <br />

            <h3>{firstName} {lastName}</h3>

            <br />

            <h3>Location: {city}, {state}</h3>

            <h3>Joined: {createdAt}</h3>

            <br />

            {username === currentUser ? (
                <>
                    <Link to={`/users/edit/${currentUser}`}>Edit Info</Link>
                </>
            ) : (
                ''
            )}

            <PostContext.Consumer>
                {({ post }) => {
                    return (
                        <div>
                            <h1>{username}'s Activity</h1>
                            <br />

                            <div>
                                {post.map((p) => {
                                    if (p.username === username) {

                                        return (
                                            <div key={p.postId}>
                                                <div>
                                                    <p>{p.post}</p>
                                                    <div>
                                                        <p>Created At: {p.createdAt}</p>
                                                        {p.username === currentUser ? (
                                                            <>
                                                                <button onClick={() => {
                                                                    navigate(`/posts/${p.postId}`)
                                                                }}>Edit</button>

                                                                <button onClick={() => {
                                                                    handleDelete(p.postId);
                                                                }}>Delete</button>



                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                )
                                    }
                                }
                                                )
                                }
                                            </div>
                }

                        </PostContext.Consumer>

                        </>
                    )
                }

            export default UserProfile;