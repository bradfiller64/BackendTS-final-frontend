import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function Home() {

    const [user, setUser] = useState();

    let { signOutUser } = useContext(UserContext);

    // function isLoggedIn() {
    //     let user = localStorage.getItem('currentUser')
    //     setUser(user);
    // }

    return (
        <>
            <nav className='navbar-main'>

                <div>
                    <h1>MyFace</h1>
                </div>


                <div className='nav-links'>
                    <Link to={`/users/${user}`}>{user}</Link>
                    {user ? <span> | </span> : ''}

                    <Link to='/posts'>Feed</Link>
                    <span> | </span>
                    <Link to='/signin' className='nav-link'>
                        Sign In
                    </Link><span> | </span>
                    {user ? (
                        <Link onClick={() => {
                            signOutUser();
                        }}
                        >
                            Sign Out
                        </Link>
                    ) : (
                        <>
                            <Link to='/signup' className='nav-link'>
                                Sign Up
                            </Link> <span> | </span>
                            <Link to='/signin' className='nav-link'>
                                Sign In
                            </Link><span> | </span>
                            <Link to='/posts' className='nav-link'>
                                Feed
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <div className='outlet'>
                <Outlet />
            </div>
        </>
    );
}


export default Home