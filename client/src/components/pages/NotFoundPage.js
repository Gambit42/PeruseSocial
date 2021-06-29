import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Page not found.</h1>
      <Link className="text-red-700" to="/home">
        Click here to go back to homepage.
      </Link>
    </div>
  );
};

export default NotFoundPage;
