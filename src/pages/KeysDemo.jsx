import React, { useState } from 'react';

// Demo to show why keys matter
export default function KeysDemo() {
  const [showProblem, setShowProblem] = useState(true);
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React Keys Demo</h1>
      
      <div className="mb-6">
        <button
          onClick={() => setShowProblem(!showProblem)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Show {showProblem ? 'Solution' : 'Problem'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {showProblem ? <ProblemDemo /> : <SolutionDemo />}
      </div>
    </div>
  );
}

// PROBLEM: Using index as key
function ProblemDemo() {
  const [items, setItems] = useState([
    { text: 'Learn React', color: 'blue' },
    { text: 'Build Projects', color: 'green' },
    { text: 'Get Job', color: 'purple' }
  ]);
  
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const addItem = () => {
    const colors = ['red', 'yellow', 'pink', 'indigo'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setItems([{ 
      text: `New Item ${items.length + 1}`, 
      color: randomColor 
    }, ...items]);
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-red-600">
        ❌ Problem: Using Index as Key
      </h2>
      
      <button
        onClick={addItem}
        className="mb-4 bg-green-500 text-white px-3 py-1 rounded"
      >
        Add Item at Beginning
      </button>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={index} // PROBLEM: Using index as key!
            className="border p-3 rounded bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-5 h-5"
              />
              <input
                type="text"
                defaultValue={item.text}
                className="flex-1 px-2 py-1 border rounded"
              />
              <div 
                className={`w-8 h-8 rounded bg-${item.color}-500`}
                style={{ backgroundColor: item.color }}
              />
              <button
                onClick={() => deleteItem(index)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Key: {index} (This is the problem!)
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
        <p className="text-sm text-red-700">
          <strong>Try this:</strong><br/>
          1. Check some checkboxes<br/>
          2. Type in some input fields<br/>
          3. Click "Add Item at Beginning" or delete the first item<br/>
          4. Watch how checkbox states and input values get mixed up! 😱
        </p>
      </div>
    </div>
  );
}

// SOLUTION: Using stable, unique IDs
function SolutionDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React', color: 'blue' },
    { id: 2, text: 'Build Projects', color: 'green' },
    { id: 3, text: 'Get Job', color: 'purple' }
  ]);
  const [nextId, setNextId] = useState(4);
  
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const addItem = () => {
    const colors = ['red', 'yellow', 'pink', 'indigo'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setItems([{ 
      id: nextId,
      text: `New Item ${nextId}`, 
      color: randomColor 
    }, ...items]);
    setNextId(nextId + 1);
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-600">
        ✅ Solution: Using Stable IDs
      </h2>
      
      <button
        onClick={addItem}
        className="mb-4 bg-green-500 text-white px-3 py-1 rounded"
      >
        Add Item at Beginning
      </button>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id} // SOLUTION: Using stable ID!
            className="border p-3 rounded bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-5 h-5"
              />
              <input
                type="text"
                defaultValue={item.text}
                className="flex-1 px-2 py-1 border rounded"
              />
              <div 
                className={`w-8 h-8 rounded bg-${item.color}-500`}
                style={{ backgroundColor: item.color }}
              />
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Key: {item.id} (Stable & Unique!)
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
        <p className="text-sm text-green-700">
          <strong>Now try the same test:</strong><br/>
          1. Check checkboxes and edit inputs<br/>
          2. Add/delete items<br/>
          3. Everything maintains its correct state! 🎉<br/>
          React can properly track each item with unique keys.
        </p>
      </div>
    </div>
  );
}