import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
// import NewPost from './components/NewPost';

function PostFeed() {

    let navigate = useNavigate();

    let { editPost, deletePost } = useContext(PostContext)

    function handleDeletePost(id) {
        deletePost(id);
        navigate('/');
    }

    return (
        <PostContext.Consumer>
            {({ post }) => {
                return (
                    <>
                        <div>
                            <h1>Feed</h1>
                            {/* <NewPost /> */}

                            {/* {post.map(p) => {
                                    return (
                                        <div >
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
