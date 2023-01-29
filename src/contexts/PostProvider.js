import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {

    const [post, setPost] = useState([]);
    const baseUrl = "http://localhost:3000/api/posts/";

    useEffect(() => {
        async function fetchData() {
            await getAllPost();
        }
        fetchData();
    }, []);

    function getAllPost() {
        return axios.get(baseUrl).then(response => setPost(response.data));
    }

    function getPost(id) {
        return axios.get(baseUrl + id).then(response => {
            return new Promise(resolve => resolve(response.data));
        })
    }

    function addPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        };

        return axios.post(baseUrl, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
            );
    }

    function editPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        };

        return axios.put(baseUrl + post._id, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            })

    }

    function deletePost(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders }).then(response => {
            getAllPost();
            return new Promise(resolve => resolve(response.data));
        });

    }

    return (
        <PostContext.Provider value={{
            post,
            getAllPost,
            getPost,
            addPost,
            editPost,
            deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
};