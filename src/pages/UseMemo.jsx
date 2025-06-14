import { useState } from "react";

function UseMemo() {
  const [items] = useState([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ]);
  const [showDetails, setShowDetails] = useState(false);
  
  // This calculation runs EVERY time showDetails changes!
  const total = items.reduce((sum, item) => {
    console.log('Calculating total...'); // See this in console
    return sum + item.price;
  }, 0);

	//   const total = useMemo(() => {
  //   console.log('Calculating total...'); // Only logs once!
  //   return items.reduce((sum, item) => sum + item.price, 0);
  // }, [items]);
  
  return (
    <div>
      <h2>Total: ${total}</h2>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
    </div>
  );
}

export default UseMemo;



// // GOOD: Only recalculates when items change
// function Cart() {
//   const [items] = useState([
//     { id: 1, name: 'Laptop', price: 999 },
//     { id: 2, name: 'Mouse', price: 29 },
//     { id: 3, name: 'Keyboard', price: 79 }
//   ]);
//   const [showDetails, setShowDetails] = useState(false);
  
//   // Only calculates when items array changes
//   const total = useMemo(() => {
//     console.log('Calculating total...'); // Only logs once!
//     return items.reduce((sum, item) => sum + item.price, 0);
//   }, [items]);
  
//   return (
//     <div>
//       <h2>Total: ${total}</h2>
//       <button onClick={() => setShowDetails(!showDetails)}>
//         {showDetails ? 'Hide' : 'Show'} Details
//       </button>
//     </div>
//   );
// }