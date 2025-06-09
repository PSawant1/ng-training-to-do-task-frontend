import React from 'react';

const Pagination = ({ currentPage, pageSize, totalRecords, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize)); // Ensure at least 1 page

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
      <select
        value={pageSize}
        onChange={(e) => {
          const newSize = Number(e.target.value);
          onPageSizeChange(newSize);
        }}
      >
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Pagination;
