import { memo, useState } from "react";

// WITHOUT React.memo
function ProductCard({ product }) {
  console.log(`Rendering product: ${product.name}`);
  
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '5px' }}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 }
  ];
// WITH React.memo
// const ProductCard = memo(function ProductCard({ product }) {
//   console.log(`Rendering product: ${product.name}`);
  
//   return (
//     <div style={{ border: '1px solid gray', padding: '10px', margin: '5px' }}>
//       <h3>{product.name}</h3>
//       <p>${product.price}</p>
//     </div>
//   );
// });
function MemoExample() {
  const [cartCount, setCartCount] = useState(0);

  
  return (
    <div>
      <h2>Cart Items: {cartCount}</h2>
      <button onClick={() => setCartCount(cartCount + 1)}>
        Add to Cart
      </button>
      
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default MemoExample;