import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, [])

    return (
        <div>
            {profile && profile.map((person, index) => (
                <div key={index}>
                    <h2>Nickname: {person.username}</h2>
                </div>
            ))}
            {posts && <ProfileFeed posts={posts}/>}
        </div>
    );
};
