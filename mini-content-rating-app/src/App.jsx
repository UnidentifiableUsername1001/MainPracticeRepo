// App.jsx
import React, { useState } from "react";
import PostCard from "./PostCard";
import "./App.css";

const initialPosts = [
  { id: 1, title: "Beach Promo", description: "Sunset cocktails and ocean views." },
  { id: 2, title: "Temple Tour", description: "Architecture, history, and culture." },
  { id: 3, title: "City Nightlife", description: "Music, food, and late nights." }
];

export default function App() {
  const initialRatings = initialPosts.reduce((acc, post) => {
    acc[post.id] = {likes: 0, dislikes: 0};
    return acc;
  }, {});

  const [ratings, setRatings] = useState(initialRatings);

  const [filter, setFilter] = useState("all");

  // TODO: initialise ratings properly on first load OR handle missing values safely
  // TODO: handlers: like, dislike, reset for a given postId
  function onLike(id) {
    setRatings((prev) => {
      const current = prev[id];

      return {
        ...prev,
        [id]: {
          ...current,
          likes: current.likes + 1,
        },
      };
    });
  }

    function onDislike(id) {
    setRatings((prev) => {
      const current = prev[id];

      return {
        ...prev,
        [id]: {
          ...current,
          dislikes: current.dislikes + 1,
        },
      };
    });
  }

  // TODO: filtering logic

  return (
    <div className="page">
      <h1>Content Ratings</h1>

      <div className="row">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("positive")}>Positive only</button>
        <button onClick={() => setFilter("negative")}>Negative only</button>
      </div>

      <div className="grid">
          {initialPosts.map((post) => {
            
            const entry = ratings[post.id] || {likes: 0, dislikes: 0};

            return (
            <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            likes={entry.likes}
            dislikes={entry.dislikes}
            onLike={() => onLike(post.id)}
            onDislike={() => onDislike(post.id)}
            />
          );
          })}
      </div>


    </div>
  );
}


