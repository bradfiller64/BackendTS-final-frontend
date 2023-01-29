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
        <>
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
                                    <h3>
                                        <Link to="/signin">Login</Link> to post
                                    </h3>
                                )

                                }
                                <div>
                                    <br />
                                    {post.map((p) => {
                                        return (
                                            <div key={p.postId} className="post">
                                                <Link className="userfeed" to={`/users/${p.username}`}>{p.username}</Link>

                                                <div className="message">
                                                    <p>{p.message}</p>
                                                </div>

                                                <div className="date">
                                                    <p>Posted: {p.createdAt}</p>
                                                </div>

                                                {p.username === user ? (
                                                    <div>
                                                        <button className="edit-btn" onClick={() => {
                                                            navigate(`/posts/${p.postId}`)

                                                        }}>Edit
                                                        </button>

                                                        <button className="del-btn" onClick={() => {
                                                            handleDeletePost(p.postId)
                                                        }}>Delete
                                                        </button>

                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </>
                    )
                }}
            </PostContext.Consumer >
        </>
    )
}
export default PostFeed;
