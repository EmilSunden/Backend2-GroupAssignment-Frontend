import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { unfollowUser, followUser } from '../../reducer/slices/follow';


export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  // const currentUser = useSelector(state => state.user.currentUser.user);
  const { username } = useParams();

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    const response = await axios.get(`/user/${username}`);
    const userData = response.data.user;
    if (Array.isArray(userData) && userData.length > 0) {
      setProfile(userData);
    } else if (userData) {
      setProfile([userData]); 
    }
  };


  const fetchPosts = async () => {
    const response = await axios.get(`/posts/user/${username}`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [following]);

  useEffect(() => {
    const followData = JSON.parse(localStorage.getItem('followData'));
    if (followData) {
      console.log('Loaded followData from localStorage', followData)

      setFollowing(followData.following);
      setIsFollowing(followData.isFollowing);
    }
  }, []);


  const handleUnfollow = async () => {
    try {
        dispatch(unfollowUser(profile[0]._id));
        console.log("Unfollowed")
        setIsFollowing(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
        dispatch(followUser(profile[0]._id));
        console.log("Followed")
        setIsFollowing(true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {profile.length > 0 && (
        <div>
          <h2>@{profile[0].username}</h2>
          {isFollowing ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
          {isFollowing && <button>Following</button>}
        </div>
      )}
      {posts && <ProfileFeed posts={posts} />}
    </div>
  );
};

export default Profile;