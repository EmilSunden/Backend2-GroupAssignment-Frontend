import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get('/users');
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form action="">
      <input
        type="text"
        placeholder="search by username"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>
                <a href={`/profile/${user.username}`}>{user.username}</a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchUser;


