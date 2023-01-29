import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
            <h1>{user.username}</h1>

            <h3>Name: {user.firstName} {user.lastName}</h3>

            <h3>Location: {user.city}, {user.state}</h3>

            <h3>Joined: {user.createdAt}</h3>

            <br />

            {user.username === currentUser ? (
                <>
                    {/* <Link to={`/users/edit/${currentUser}`}>Edit Info</Link> */}
                    <button className="submit-btn" onClick={() => {
                        navigate(`/users/edit/${currentUser}`)
                    }}>Edit Info
                    </button>
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
                                            <div key={p.postId} className="post">
                                                <div className="message">
                                                    <p>{p.message}</p>
                                                    <div className="date">
                                                        <p>Created At: {p.createdAt}</p>

                                                        {p.username === currentUser ? (
                                                            <>
                                                                <button className="edit-btn" onClick={() => {
                                                                    navigate(`/posts/${p.postId}`)
                                                                }}>Edit
                                                                </button>

                                                                <button className="del-btn" onClick={() => {
                                                                    handleDelete(p.postId);
                                                                }}>Delete
                                                                </button>
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                    );
                }}

            </PostContext.Consumer>

        </>
    );
};

export default UserProfile;