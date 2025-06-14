import { memo, useCallback, useState } from "react";

// Parent Component
function UseCallback() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // BAD: Creates new function every render
  // const reset = () => {
  //   console.log('Reset function created');
  //   setCount(0);
  // };
	 // GOOD: Same function reference
  const reset = useCallback(() => {
    console.log('Reset function created');
    setCount(0);
  }, []); // Empty array = never recreate
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Type here..."
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      
      <Child onReset={reset} />
    </div>
  );
}

// Child Component - Wrapped in memo
const Child = memo(function Child({ onReset }) {
  console.log('Child rendered!');
  
  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <h3>Child Component</h3>
      <button onClick={onReset}>Reset Count</button>
    </div>
  );
});


export default UseCallback