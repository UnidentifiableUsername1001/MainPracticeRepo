import React from "react";
import EmployeeCard from "./EmployeeCard";
import "./style.css";

export default function App() {
  return (
    <div className="page">
      <EmployeeCard
        name="John"
        role="Event Coordinator"
        department="Operations"
        salaryIncrease={10000}
      />
    </div>
  );
}


