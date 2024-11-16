import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ total, current, onPageChange }) => {
  const pageNumbers = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className="flex justify-center my-4">
      <ul className="flex list-none space-x-2">
        {current > 1 && (
          <li>
            <button
              className="btn btn-outline"
              onClick={() => onPageChange(current - 1)}
              aria-label="前のページ"
            >
              «
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`btn ${
                current === number ? 'bg-blue-500 text-white' : 'btn-outline'
              }`}
              onClick={() => onPageChange(number)}
              aria-current={current === number ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        {current < total && (
          <li>
            <button
              className="btn btn-outline"
              onClick={() => onPageChange(current + 1)}
              aria-label="次のページ"
            >
              »
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,      // 総ページ数
  current: PropTypes.number.isRequired,    // 現在のページ
  onPageChange: PropTypes.func.isRequired, // ページ変更時のコールバック
};

export default Pagination;
