import React from "react";
import { BiBookAdd } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const ComposeEntry = () => {
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: `/compose/entry`,
        state: { background: location },
      }}
    >
      <div className="fixed bottom-0 left-0 pb-3 pl-2">
        <BiBookAdd className="cursor-pointer w-14 h-14 px-3 py-3 rounded-full bg-green-500 hover:bg-green-900 hover:text-white text-white transition duration-300 ease-in-out" />
      </div>
    </Link>
  );
};

export default ComposeEntry;
