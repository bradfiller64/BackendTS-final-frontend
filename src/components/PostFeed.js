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
                navigate('/posts');
            })
            .catch((error) => {
                console.log(error);
                window.AudioListener('Failed to Post :(')
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
                                <h3>
                                    Please <Link to="/signin"> Login</Link>
                                </h3>
                            )
                            }


                            {/* {post.map(p) => {
                                    return (
                            <div key={p.postId} >
                                <p>Username: </p>>
                            </div>
                            );
                                }
                            )} */}
                        </div>
                    </>
                );
            }}
        </PostContext.Consumer >
    );
}

export default PostFeed;
