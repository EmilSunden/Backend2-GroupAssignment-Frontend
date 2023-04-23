import React from 'react'

const ProfileFeed = ({posts}) => {
  return (
    <div>
        {posts && posts.map((post, i) => (
            <div key={i}>
                <h1>{post.title}</h1>
                <p>{post.createdAt}</p>
            </div>
        ))}
    </div>
  )
}

export default ProfileFeed