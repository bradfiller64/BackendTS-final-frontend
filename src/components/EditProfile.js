import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const EditProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        createdAt: ''
    })
}

const [currentUser, setCurrentUser] = useState();

let { getUser, editUser } = useContext(UserContext);

let navigate = useNavigate();

function isLoggedIn() {
    let user = localStorage.getItem('currentUser')
    setCurrentUser(user);
}

export default EditProfile;