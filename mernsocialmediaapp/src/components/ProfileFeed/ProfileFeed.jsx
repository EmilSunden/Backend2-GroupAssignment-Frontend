import React from 'react'
import { Post } from "../Post/index";
const ProfileFeed = ({posts}) => {
  return (
    <div> 
        {posts && posts.map((post, index) => (
            <Post
            _id={post._id}
            title={post.title}
            imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
            createdAt={post.createdAt}
            user={{
              avatarUrl:
                "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
              fullName: post.user.username,
            }}
            viewsCount={post.views}
            commentsCount={3}
            tags={["react", "fun", "typescript"]}
          />
        ))}
    </div>
  )
}

export default ProfileFeed