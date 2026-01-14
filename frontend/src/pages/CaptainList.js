import React, { useState } from "react";
import "./App.css";

const CaptainsList = () => {
  const [activeId, setActiveId] = useState(null);

  const blocks = [
    { id: "B1", name: "Name Surname" },
    { id: "B2", name: "Name Surname" },
    { id: "B3", name: "Name Surname" },
    { id: "B4", name: "Name Surname" },
    { id: "B5", name: "Name Surname" },
    { id: "B6", name: "Name Surname" },
    { id: "B7", name: "Name Surname" },
    { id: "B8", name: "Name Surname" },
    { id: "B9", name: "Name Surname" },
    { id: "B10", name: "Name Surname" },
    { id: "B11", name: "Name Surname" },
    { id: "B12", name: "Name Surname" },
  ];

  const toggleBlock = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="list-container">
      {blocks.map((block) => (
        <div
          key={block.id}
          onClick={() => toggleBlock(block.id)}
          className={`block-card ${activeId === block.id ? "active" : ""}`}
        >
          {/* HEADER: Shows B1, B2... and the Arrow */}
          <div className="card-header">
            <span className="block-id">{block.id}</span>
            <svg
              className="arrow-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {/* CONTENT: Only shows when active */}
          <div className="card-content">
            <div className="captain-name">
              {/* This splits the name into two lines if it has a space */}
              {block.name.split(" ").map((part, index) => (
                <div key={index}>{part}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaptainsList;
