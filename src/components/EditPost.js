import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const EditPost = () => {
    let [post, setPost] = useState('');

    let { getPost, editPost } = useContext(PostContext);
    let navigate = useNavigate();

    function isLoggedIn() {
        let user = localStorage.getItem('currentUser')
        setCurrentUser(user);
    }

    useEffect(() => {
        async function fetch() {
            await getPost(post).then((user) => setUser(user));
        }
        isLoggedIn();
        fetch();
    }, [getPost, currentUser]);


    function handleChange(event) {
        setNewPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {

        addPost(newPost).then(() => {
            navigate('/');
            alert('Post updated!');
        }).catch(error => {
            console.log(error);
            navigate('/');
            alert('Failed to update post! :(');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="What's on your mind?"
                maxLength={255}
                rows={5}
                cols={70}
                name="message"
                value={post.message}
                onChange={handleChange} />

            <br></br><br></br>
            <button>Update</button>
        </form>
    )
}

export default EditPost