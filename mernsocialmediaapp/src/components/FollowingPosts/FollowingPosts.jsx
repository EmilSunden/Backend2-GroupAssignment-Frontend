import React from "react";
import { Post } from "../Post/index";

const FollowingPosts = ({ posts }) => {
  return (
    <div>
      Latest post of the people you follow
      {posts &&
        posts.map((postArray, i) => (
          <div key={i}>
            {postArray.map((post, i) => (
              <Post
                key={i}
                _id={post._id}
                title={post.title}
                text={post.text}
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
        ))}
    </div>
  );
};

export default FollowingPosts;
