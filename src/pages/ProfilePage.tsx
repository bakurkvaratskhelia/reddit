import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostCard from "../components/PostCard";
import "../styles/SubmitPage.css";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  // Use useQuery since server now returns an array
  const posts = useQuery(
    api.post.userPosts,
    username ? { authorUsername: username } : "skip"
  );

  const stats = useQuery(
    api.users.getPublicUser,
    username ? { username } : "skip"
  );

  if (posts === undefined)
    return (
      <div className="content-container">
        <div className="profile-header">
          <h1>u/{username}</h1>
        </div>
        <div className="loading">Loading posts...</div>
      </div>
    );

  return (
    <div className="content-container">
      <div className="profile-header">
        <h1>u/{username}</h1>
        <p style={{ color: "#7c7c7c" }}>Posts: {stats?.posts ?? 0}</p>
      </div>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id.toString()} post={post} showSubreddit={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;