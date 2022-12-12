import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import LandingPage from './components/LandingPage';
import NavLink from './components/NavLink';
import SignUp from './components/SignUp';
import ManageAccount from './components/ManageAccount';
import Users from './components/Users';
import Login from './components/Login';
import Posts from './components/Posts';
import PostsbyID from './components/PostsbyID';
import EditPostmodal from './components/EditPostModal';
import Comments from './components/Comments'
// import Context from '../src/context/UserContext'
// import useAuth from './context/useAuth';
import DeletePostModal from './components/DeletePostModal';
import PostDetails from './components/PostDetails';
import { AuthProvider } from './context/UserContext';



function App() {
  // const [isAuth, login, logout] = useAuth(false)
  return (
    <Router>
      <ChakraProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/managemyaccount" element={<ManageAccount />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/myposts" element={<PostsbyID />} />
            <Route path="/posts/postdetails" element={<PostDetails />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
