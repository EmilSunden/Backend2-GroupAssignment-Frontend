import React from 'react'

const ProfileFeed = ({ posts }) => {
  return (
    <>
        {posts.map(post => (
            <div key={post._id}>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
            </div>  
        ))}
    </>
  )
}

export default ProfileFeed