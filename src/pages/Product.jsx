import React from 'react'
import { useParams, useSearchParams } from 'react-router'

const Product = () => {
  // Get URL parameters (from route path like /product/:id)
  const params = useParams();
  
  // Get search/query parameters (from URL like ?color=red&size=large)
  const [searchParams, setSearchParams] = useSearchParams();
  
  console.log("🚀 ~ Product ~ URL params:", params)
  console.log("🚀 ~ Product ~ Search params:", searchParams)
  
  // Get specific search param values
  const color = searchParams.get('color');
  const size = searchParams.get('size');
  const category = searchParams.get('category');
  
  // Get all search params as an object
  const allSearchParams = Object.fromEntries(searchParams.entries());
  
  console.log("🚀 ~ Product ~ color:", color)
  console.log("🚀 ~ Product ~ size:", size)
  console.log("🚀 ~ Product ~ all search params:", allSearchParams)
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Page</h1>
      
      {/* Display URL Parameters */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">URL Parameters:</h2>
        <pre className="text-sm">
          {JSON.stringify(params, null, 2)}
        </pre>
      </div>
      
      {/* Display Search Parameters */}
      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Search Parameters:</h2>
        <div className="space-y-2">
          <p><strong>Color:</strong> {color || 'Not specified'}</p>
          <p><strong>Size:</strong> {size || 'Not specified'}</p>
          <p><strong>Category:</strong> {category || 'Not specified'}</p>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-gray-600">All Search Params (Raw)</summary>
          <pre className="text-xs mt-2 bg-white p-2 rounded">
            {JSON.stringify(allSearchParams, null, 2)}
          </pre>
        </details>
      </div>
      
      {/* Example URLs to test */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Try these URLs:</h2>
        <ul className="text-sm space-y-1">
          <li><code>/product/123</code></li>
          <li><code>/product/123?color=red</code></li>
          <li><code>/product/456?color=blue&size=large</code></li>
          <li><code>/product/789?color=green&size=medium&category=shoes</code></li>
        </ul>
      </div>
      
      {/* Update search params example */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h2 className="text-lg font-semibold mb-2">Update Search Params:</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setSearchParams({ color: 'red', size: 'large' })}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Set Red Large
          </button>
          <button 
            onClick={() => setSearchParams({ color: 'blue', size: 'small' })}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Set Blue Small
          </button>
          <button 
            onClick={() => setSearchParams({})}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product

// ===============================================
// Route Setup Example (for App.jsx)
// ===============================================

/*
In your App.jsx, add this route:

import Product from './pages/Product'

<Routes>
  <Route path="/product/:id" element={<Product />} />
  // ... other routes
</Routes>

This will capture:
- URL params: /product/123 → { id: "123" }
- Search params: ?color=red&size=large → color="red", size="large"
*/

// ===============================================
// Key Differences:
// ===============================================

/*
useParams() - URL Parameters:
=============================
- From route path: /product/:id/:category
- URL: /product/123/shoes
- Result: { id: "123", category: "shoes" }
- Part of the route definition
- Used for required data (IDs, slugs)

useSearchParams() - Query Parameters:
====================================
- From query string: ?color=red&size=large&page=2
- URL: /product/123?color=red&size=large
- Result: URLSearchParams object
- Optional data
- Used for filters, pagination, sorting

Methods:
========
searchParams.get('color') → "red"
searchParams.has('color') → true
searchParams.getAll('tags') → ["tag1", "tag2"] (for multiple values)
searchParams.toString() → "color=red&size=large"
*/