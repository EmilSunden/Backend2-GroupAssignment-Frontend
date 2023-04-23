import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProfileFeed from '../../components/profile/ProfileFeed';

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);
   
    const { username } = useParams();

    const fetchProfile = async () => {
        const response = await axios.get(`http://localhost:5050/api/user/${username}`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        const userData = response.data.user;
        if (Array.isArray(userData)){
            setProfile(userData)
        } else {
            setProfile([userData])
        }
    }

    const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:5050/api/posts/${username}`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        setPosts(response.data)
    }

    useEffect(() => {
        fetchProfile()
        fetchPosts()
    }, [])

  return (
    <div>
        {profile && profile.map(person => (
            <div key={person._id}>
                <h2>@{person.username}</h2>
            </div>
        ))}
        {posts && <ProfileFeed posts={posts} />}
        
        <Link to={`followers`}>Followers</Link>
    </div>
  )
}

export default Profile