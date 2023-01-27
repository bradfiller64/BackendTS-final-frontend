import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PostFeed from './components/PostFeed'
import NewPost from './components/NewPost'
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
                {/* <Route index element={<NewPost />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                {/* <Route path="/newpost" element={<NewPost />} /> */}
                <Route path="/posts" element={<PostFeed />} />
              </Route>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </BrowserRouter >
        </div>

      </PostProvider>
    </UserProvider>
  );
}

export default App;
