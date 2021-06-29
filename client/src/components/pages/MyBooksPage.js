import React from "react";
import Navbar from "../utils/Navbar";
import ComposeEntry from "../utils/ComposeEntry";

const MyBooksPage = ({ currentUserData, match, location }) => {
  return (
    <div className="overflow-hidden">
      <Navbar currentUserData={currentUserData} match={match} />
      <div className="pt-20 px-5 z-10">
        <h1>{currentUserData.email}</h1>
      </div>
      <button
        onClick={() => {
          console.log(location);
        }}
      >
        See Login Route
      </button>
      <p>lorem1000</p>
      <ComposeEntry />
    </div>
  );
};

export default MyBooksPage;
