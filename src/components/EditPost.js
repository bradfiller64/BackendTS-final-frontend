import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const EditPost = () => {
    let { id } = useParams()

    let [post, setPost] = useState('');

    let { getPost, editPost, deletePost } = useContext(PostContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) return

        async function fetch() {
            await getPost(id).then((post) => setPost(post));
        }
        fetch();
    }, [id, getPost]);


    function handleChange(event) {
        setPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault()
        editPost(post).then(() => {
            navigate('/posts');
            alert('Post updated!');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
            alert('Failed to update post! :(');
        });
    }

    const handleDelete = () => {
        deletePost(id)
        navigate('/posts')
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
            <button className="submit-btn">Update</button>
            <button className="del-btn" onClick={handleDelete}>Delete</button>
        </form>
    )
}

export default EditPost