// EmployeeCard.jsx
import React, { useState } from "react";
import "./style.css";

export default function EmployeeCard(props) {
const [showIncrease, setShowIncrease] = useState(false);

const [showHighlight, setShowHighlight] = useState(false);
  return (
    <div className={`card ${showHighlight ? "highlight" : ""}`}>
      <h1>{props.name}</h1>
      <h2>{props.role}</h2>
      <div>{props.department}</div>
      
      <button onClick={() => setShowIncrease(!showIncrease)}>
            Click here to {showIncrease ? 'hide' : 'show'} the yearly increase
        </button>

        <button onClick={() => setShowHighlight(!showHighlight)}>
            Click here to highlight this button!
        </button>

      {showIncrease && <div>{props.salaryIncrease}</div>}
    </div>
  );
}
