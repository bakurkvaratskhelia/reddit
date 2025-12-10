import { useParams } from "react-router-dom";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostCard from "../components/PostCard";
import "../styles/SubmitPage.css";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  // usePaginatedQuery's args must include `paginationOpts` per the generated types.
  // When there is no username, pass "skip" (not undefined) so the hook types align.
  const paginatedArgs = username
    ? { authorUsername: username, paginationOpts: { limit: 20 } }
    : "skip";

  // usePaginatedQuery also requires an options object as the third argument.
  const { results: posts, loadMore, status } = usePaginatedQuery(
    api.post.userPosts,
    paginatedArgs,
    { initialNumItems: 20 }
  );

  // useQuery likewise accepts "skip" to avoid passing undefined where args are required.
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
            // Ensure key is a string — convert Convex Id to string if necessary
            <PostCard key={post._id.toString()} post={post} showSubreddit={true} />
          ))
        )}
        {status === "CanLoadMore" && (
          <button className="load-more" onClick={() => loadMore(20)}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;