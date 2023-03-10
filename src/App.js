import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PostFeed from './components/PostFeed'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'
import EditPost from './components/EditPost'
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
              <Route exact path="/" element={<Home />}>
                <Route index element={<PostFeed />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/users/:username" element={<UserProfile />} />
                <Route path="/users/edit/:username" element={<EditProfile />} />
                <Route path="/posts/:id" element={<EditPost />} />
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
