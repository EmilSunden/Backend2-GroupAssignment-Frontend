import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from '../../axios';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';

export const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([])

    const {username} = useParams();

    const fetchProfile = async () => {
        const response = await axios.get(`/user/${username}`);
        const userData = response.data.user;
        if (Array.isArray(userData)) {
            setProfile(userData)
        } else {
            setProfile([userData])
        }
    }

    const fetchPosts = async () => {
        const response = await axios.get(`/posts/user/${username}`)
        setPosts(response.data)
    }

    const followUser = async () => {
        try {
            const response = await axios.post(`/follow/${profile[0]._id}`)
            if (response.status == 200) {
                alert(`You are now following ${profile[0].username}`)
            }
        } catch (error) {
            alert('you already follow this user')
        }
    }


    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, [])

    return (
        <div>
            {profile && profile.map((person, index) => (
                <div key={index}>
                    <h2>@{person.username}</h2>
                    <Button onClick={followUser} variant="contained">Follow</Button>
                </div>
            ))}
            {posts && <ProfileFeed posts={posts}/>}
        </div>
    );
};
