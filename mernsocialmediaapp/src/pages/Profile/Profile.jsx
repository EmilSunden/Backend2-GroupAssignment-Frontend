import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { unfollowUser, followUser } from '../../reducer/slices/posts';


export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser.user);
  console.log("Logged in user:", currentUser)
  const { username } = useParams();

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    const response = await axios.get(`/user/${username}`);
    const userData = response.data.user;
    if (Array.isArray(userData) && userData.length > 0) {
      setProfile(userData);
      console.log("Profile:", profile)
    } else if (userData) {
      setProfile([userData]);
      console.log("Profile:", profile)
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
    setFollowing(currentUser.following);
    console.log(following)
  }, [currentUser]);


  const handleUnfollow = async () => {
    try {
        await dispatch(unfollowUser(profile[0]._id));
        console.log("Unfollowed")
        setIsFollowing(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
        await dispatch(followUser(profile[0]._id));
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