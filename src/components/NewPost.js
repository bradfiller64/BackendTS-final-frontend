import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const NewPost = () => {
    let [newPost, setNewPost] = useState('');

    let { addPost } = useContext(PostContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewPost((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit() {

        addPost(newPost).then(() => {
            navigate('/posts');
            alert('Post created!');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
            alert('Failed to post :(');
        });
    }

    return (
        <div className="newPost">
            <form onSubmit={handleSubmit}>
                <textarea placeholder="What's on your mind?"
                    maxLength={255}
                    rows={5}
                    cols={70}
                    name="message"
                    value={newPost.message}
                    onChange={handleChange} />

                <br></br><br></br>
                <button className="submit-btn">Post</button>
            </form>
        </div>
    )
};

export default NewPost;