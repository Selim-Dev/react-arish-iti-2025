import { useState, useMemo, useEffect } from "react";

/**
 * Generic pagination hook
 * @param {Array} items            – full list to paginate
 * @param {number} itemsPerPage    – how many items on each page
 */
export default function usePagination(items = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  // How many pages do we need?
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Make sure currentPage never goes out of range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
    if (currentPage < 1) setCurrentPage(1);
  }, [currentPage, totalPages]);

  // Slice out the items for the current page
  const currentItems = useMemo(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return items.slice(firstIndex, lastIndex);
  }, [items, currentPage, itemsPerPage]);

  // Helper for changing page (clamped to valid range)
  const goToPage = (pageNum) => {
    if (pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    setCurrentPage(pageNum);
  };

  return { currentItems, currentPage, totalPages, goToPage, setCurrentPage };
}
