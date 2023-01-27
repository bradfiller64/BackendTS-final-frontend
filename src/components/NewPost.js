import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const NewPost = () => {
    let [newPost, setNewPost] = useState('');

    let { addPost } = useContext(PostContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewPost((prevValue) => {
            return { ...prevValue, [event.target.message]: event.target.value }
        });
    }

    function handleSubmit(event) {

        addPost(newPost).then(() => {
            navigate('/');
            alert('Post created!');
        }).catch(error => {
            console.log(error);
            navigate('/');
            alert('Failed to post :(');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="What's on your mind?" name="message" value={newPost.message} onChange={handleChange} />
            <br></br><br></br>
            <button>Post</button>
        </form>
    )
};

export default NewPost;