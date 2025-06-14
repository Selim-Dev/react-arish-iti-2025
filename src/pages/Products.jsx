import { Link } from "react-router";
import { useState } from "react";

export default function ProductsList() {
    const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      category: "Electronics",
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: "Electronics",
      rating: 4.8,
      inStock: true
    },

    {
      id: 4,
      name: "Laptop Backpack",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "Accessories",
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      category: "Home",
      rating: 4.3,
      inStock: true
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Sports",
      rating: 4.7,
      inStock: true
    },
    {
      id: 7,
      name: "Smartphone",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      category: "Electronics",
      rating: 4.9,
      inStock: false
    },
    {
      id: 8,
      name: "Book Set",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      category: "Books",
      rating: 4.4,
      inStock: true
    }
  ]);
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="block border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-t"
            />
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <span className="text-green-600 font-bold">${p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
