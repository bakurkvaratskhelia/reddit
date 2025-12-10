import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostCard from "../components/PostCard";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/PostPage.css";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  // Only call the query when postId exists.
  // Cast the router string to `any` to satisfy the Convex Id generic expected by the generated API.
  // When there's no postId, pass the string "skip" (not undefined) so the hook's types align.
  const post = useQuery(
    api.post.getPost,
    postId ? { id: postId as any } : "skip"
  );

  if (!post) {
    return (
      <div className="post-page loading">
        <div className="container">Loading...</div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="container">
        <div className="page-header">
          <div
            onClick={() => navigate(-1)}
            className="back-link"
            style={{ cursor: "pointer" }}
          >
            <FaArrowLeft /> Back
          </div>
        </div>
        <PostCard post={post} showSubreddit={true} expandedView={true} />
      </div>
    </div>
  );
};

export default PostPage;