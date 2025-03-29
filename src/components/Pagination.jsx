import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
