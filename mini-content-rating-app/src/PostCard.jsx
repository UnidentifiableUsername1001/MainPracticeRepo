// PostCard.jsx
import React from "react";

export default function PostCard({
  title,
  description,
  likes,
  dislikes,
  onLike,
  onDislike,
  onReset
}) {
  // TODO: calculate score in here OR receive as a prop

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <span>Likes: {likes} Disikes: {dislikes} Score: </span>
      </div>
      <div className="row">
        <button onClick={onLike}>Like</button>
        <button onClick={onDislike}>Dislike</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
