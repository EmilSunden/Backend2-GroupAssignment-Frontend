import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Followers = () => {
    const [followers, setFollowers] = useState([]);

    const { username } = useParams();

    const fetchFollowers = async () => {
        const response = await axios.get(`http://localhost:5050/api/followers/${username}`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        
        setFollowers(response.data.followers)
        
    }

    useEffect(() => {
        fetchFollowers()
    }, [])

  return (
    <div>
        Followers  
        {followers && followers.map((follower => (
            <div key={follower._id}>
                {follower.username}
            </div>
        )))}
    </div>
  )
}

export default Followers