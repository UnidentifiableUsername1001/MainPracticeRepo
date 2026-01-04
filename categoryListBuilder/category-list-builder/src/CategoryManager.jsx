// CategoryManager.jsx
import React, { useState } from "react";

export default function CategoryManager() {
  const [socialItems, setSocialItems] = useState(["Birthday", "Anniversary"]);
  const [entItems] = useState(["Concert", "Comedy Night"]);
  const [newItem, setNewItem] = useState("");

  return (
    <div className="panel">
      <h2>Event Categories</h2>

      <section>
        <h3>Social Events</h3>
        {socialItems.length === 0 ? <div>No items in Social Events</div> : ""}
        <ul>
          {socialItems.map((item, index) => (<li key={index}>{item}<button onClick={() => {
            setSocialItems(prev => prev.filter((_, i) => i !== index));
          }}>Remove</button></li>))}
        </ul>

        <div className="row">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a social event..."
          />
          <button onClick={() => {
            setSocialItems([
                ...socialItems,
                newItem
            ]);

            setNewItem("");
          }}>
            Add
          </button>
        </div>


      </section>

      <section>
        <h3>Entertainment</h3>
        <ul>
          {entItems.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </section>
    </div>
  );
}
