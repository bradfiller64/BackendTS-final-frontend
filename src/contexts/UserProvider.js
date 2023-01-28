import React from "react";
import axios from "axios";
import UserContext from "./UserContext";

export const UserProvider = (props) => {

    const baseUrl = "http://localhost:3000/api/users/";

    function createUser(newUser) {

        return axios.post(baseUrl, newUser)
            .then((response) => {
                return new Promise((resolve) => resolve(response.data));
            }
            );
    }

    function getUser(username) {
        return axios.get(baseUrl + username).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        });
    }

    function signInUser(username, password) {
        let user = { username, password };

        return axios.post(`${baseUrl}/login`, user)
            .then((response) => {
                localStorage.setItem('usertoken', response.data.token);
                localStorage.setItem('currentUser', user.username)
                return new Promise((resolve) => resolve(response.data));
            }
            );
    }

    function signOutUser() {
        localStorage.setItem('postToken', '');
        localStorage.setItem('currentUser', '');
        window.location.reload(true);
    }

    return (
        <UserContext.Provider value={{
            createUser,
            getUser,
            signInUser,
            signOutUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}