import React from "react";

export default function Pagination({
  followersPerPage,
  totalFollowers,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFollowers / followersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav aria-label="">
        <ul className="flex justify-center items-center py-6 gap-1">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-2 leading-tight text-gray-500 ${
                  currentPage === number
                    ? `bg-orange-400 text-white`
                    : `bg-white text-gray-500`
                }  border border-gray-300 `}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
