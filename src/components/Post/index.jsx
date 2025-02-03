export const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
    </div>
  );
};
