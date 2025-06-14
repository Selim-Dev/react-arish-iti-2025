import { productsList } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

const HomePagination = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(productsList);
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Fix currentPage if it goes out of range
  let page = currentPage;
  if (page > totalPages) page = totalPages;
  if (page < 1) page = 1;
  if (!page) page = 1;

  // Get items for current page
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredProducts.slice(firstIndex, lastIndex);

  // Get list of unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Change page
  const goToPage = (pageNum) => {
    if (pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    setCurrentPage(pageNum);
  };
 return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {currentItems.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              disabled={page === pageNum}
              className={`px-3 py-1 border rounded ${
                page === pageNum ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default HomePagination;