import React from 'react';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom'
import './styles/App.css'


function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <span> | </span>
          <Link to="/signin">Sign In</Link>
          <span> | </span>
          <Link to="/posts">Feed</Link>
          <hr></hr>
        </nav>
        {/* <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
