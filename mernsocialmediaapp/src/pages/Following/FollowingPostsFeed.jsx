import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from '../../axios';
import FollowingPosts from '../../components/FollowingPosts/FollowingPosts';


export const FollowingPostsFeed = () => {
    const [posts, setPosts] = useState([])

    const {id} = useParams();

    const fetchFollowingPosts = async () => {
        const response = await axios.get(`/following/${id}`)
        setPosts(response.data.following)
    }

    useEffect(() => {
        fetchFollowingPosts();
    }, [])

    return (
        <div>
          {posts && <FollowingPosts posts={posts}/>}
        </div>
      )
      
}

