import React from 'react'

const ProfileFeed = ({posts}) => {
  return (
    <div> Users Posts:
        {posts && posts.map((post, index) => (
            <div key={index}>
                <li>Articles: {post.title}</li>
                <p>Post created: {post.createdAt}</p>
            </div>
        ))}
    </div>
  )
}

export default ProfileFeed