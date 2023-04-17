import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerUser = await axios.post('http://localhost:5050/api/auth/register', ({ username, password}))
    if (registerUser) {
      console.log('User successfully registered!')
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
      <button>Register</button>
    </form>
  )
}

export default Register