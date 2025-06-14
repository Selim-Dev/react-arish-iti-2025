import { useEffect, useState } from "react";
import { productsList } from "../data/products";
import ProductCard from "../components/ProductCard";
import usePagination from "../hooks/usePagination";

const HomeCustomHooks = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load your data (once)
  useEffect(() => setProducts(productsList), []);

  /* ---------- Filtering ---------- */
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  /* ---------- Pagination (via hook) ---------- */
  const itemsPerPage = 5;
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    setCurrentPage, // exposed so we can reset to page 1 on filter change
  } = usePagination(filteredProducts, itemsPerPage);

  /* ---------- Category list for <select> ---------- */
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search + Category filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);              {/* reset to first page */}
          }}
          className="border px-4 py-2 rounded"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);              {/* reset to first page */}
          }}
          className="border px-4 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {currentItems.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              disabled={currentPage === pageNum}
              className={`px-3 py-1 border rounded ${
                currentPage === pageNum ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeCustomHooks;
