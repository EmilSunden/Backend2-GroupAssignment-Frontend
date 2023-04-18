import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = await axios.post('http://localhost:5050/api/auth/login', ({ username, password}))
    if (loginUser) {
      console.log('User successfully logged in!')
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        <span>
          username
        </span>
        <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="">
        <span>
          password
        </span>
        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Login</button>
    </form>
  )
}

export default Login