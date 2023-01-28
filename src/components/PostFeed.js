import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import NewPost from './NewPost';

function PostFeed() {
    let { deletePost } = useContext(PostContext);
    const [user, setUser] = useState(null);

    let navigate = useNavigate();

    function isLoggedIn() {
        let user = localStorage.getItem('currentUser')
        setUser(user);
    }

    useEffect(() => {
        async function fetchData() {
            await isLoggedIn();
        }
        fetchData();
    }, []);

    function handleDeletePost(id) {
        deletePost(id)
            .then(() => {
                window.alert('Posted Deleted')
                navigate('/posts');
            })
            .catch((error) => {
                console.log(error);
                window.alert('Failed to Delete Post :(')
                navigate('/signin');
            })
    }

    return (
        <PostContext.Consumer>
            {({ post }) => {
                return (
                    <>
                        <div>
                            <h1>Feed</h1>
                            <br />

                            {user ? (
                                <NewPost />
                            ) : (
                                // <h3>
                                //     Please <Link to="/signin"> Login</Link>
                                // </h3>
                                <button onClick={() => {
                                    navigate(`/signin`)
                                }}>Login to Post
                                </button>
                            )
                            }


                            {post.map((p) => {
                                return (
                                    <div key={p.postId} className="post">
                                        <Link to={`/users/${p.username}`}>{p.username}</Link>

                                        <div className="message">
                                            <p>{p.message}</p>
                                        </div>

                                        <div className="date">
                                            <p>Posted: {p.createdAt}</p>
                                        </div>

                                        {p.username === user ? (
                                            <div>
                                                <button onClick={() => {
                                                    navigate(`/users/edit/${username}`)
                                                }}>Edit
                                                </button>

                                                <button onClick={() => {
                                                    handleDeletePost(`/posts/${p.postId}`)
                                                }}>Edit
                                                </button>
                                        )}
                                            </div>
                                        );
                            }
                            )}
                                    </div>
                    </>
                        );
            }}
                    </PostContext.Consumer >
                );
            }

export default PostFeed;
