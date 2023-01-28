import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PostFeed from './components/PostFeed'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import { PostProvider } from './contexts/PostProvider';
import { UserProvider } from './contexts/UserProvider';
import './styles/App.css'


function App() {
  return (
    <UserProvider>
      <PostProvider>

        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/users/:username" element={<UserProfile />} />
                <Route path="/users/edit/:username" element={<UserProfile />} />
                <Route path="/posts/:id" element={<EditProfile />} />
                <Route path="/posts" element={<PostFeed />} />
              </Route>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </BrowserRouter >
        </div>
        <br></br>

      </PostProvider>
    </UserProvider>
  );
}

export default App;
