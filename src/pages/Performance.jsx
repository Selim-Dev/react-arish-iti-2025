import React, { useState, useMemo, useCallback, memo } from 'react';

export default function PerformanceDemo() {
  const [activeDemo, setActiveDemo] = useState('useMemo');
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Performance Hooks Demo</h1>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveDemo('useMemo')}
          className={`px-4 py-2 rounded ${
            activeDemo === 'useMemo' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          useMemo Demo
        </button>
        <button
          onClick={() => setActiveDemo('useCallback')}
          className={`px-4 py-2 rounded ${
            activeDemo === 'useCallback' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          useCallback Demo
        </button>
        <button
          onClick={() => setActiveDemo('memo')}
          className={`px-4 py-2 rounded ${
            activeDemo === 'memo' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          React.memo Demo
        </button>
      </div>
      
      {activeDemo === 'useMemo' && <UseMemoDemo />}
      {activeDemo === 'useCallback' && <UseCallbackDemo />}
      {activeDemo === 'memo' && <ReactMemoDemo />}
    </div>
  );
}

// useMemo Demo - Expensive Calculations
function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generate large dataset
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    category: ['Electronics', 'Books', 'Clothing'][i % 3],
    price: Math.random() * 1000
  }));
  
  // WITHOUT useMemo - recalculates every render
  const expensiveFilter = () => {
    console.log('🔴 Expensive calculation running...');
    const start = performance.now();
    
    // Simulate expensive operation
    let result = items;
    for (let i = 0; i < 1000000; i++) {
      result = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const end = performance.now();
    console.log(`Took ${(end - start).toFixed(2)}ms`);
    return result;
  };
  
  // WITH useMemo - only recalculates when searchTerm changes
  const memoizedFilter = useMemo(() => {
    console.log('🟢 Memoized calculation running...');
    const start = performance.now();
    
    // Simulate expensive operation
    let result = items;
    for (let i = 0; i < 1000000; i++) {
      result = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const end = performance.now();
    console.log(`Took ${(end - start).toFixed(2)}ms`);
    return result;
  }, [searchTerm]); // Only re-runs when searchTerm changes
  
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="border-2 border-red-500 p-4 rounded">
        <h3 className="text-lg font-bold text-red-600 mb-4">
          ❌ Without useMemo
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Recalculates on EVERY render (even clicking the counter!)
        </p>
        
        <button
          onClick={() => setCount(count + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        >
          Count: {count} (Click me and watch console!)
        </button>
        
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        
        <div className="bg-red-50 p-3 rounded">
          <p className="text-sm">
            Results: {expensiveFilter().length} items
          </p>
          <p className="text-xs text-red-600 mt-1">
            Check console - calculation runs even when clicking counter!
          </p>
        </div>
      </div>
      
      <div className="border-2 border-green-500 p-4 rounded">
        <h3 className="text-lg font-bold text-green-600 mb-4">
          ✅ With useMemo
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Only recalculates when search term changes
        </p>
        
        <button
          onClick={() => setCount(count + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        >
          Count: {count} (Click me - no recalculation!)
        </button>
        
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        
        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm">
            Results: {memoizedFilter.length} items
          </p>
          <p className="text-xs text-green-600 mt-1">
            Calculation only runs when search changes!
          </p>
        </div>
      </div>
    </div>
  );
}

// useCallback Demo - Prevent Child Re-renders
function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // WITHOUT useCallback - new function every render
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  // WITH useCallback - same function reference
  const memoizedHandleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty deps = never changes
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded">
        <p className="mb-4">
          Parent component renders: {count} times
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Increment Parent Counter
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to trigger parent re-render"
          className="px-3 py-2 border rounded"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-red-600 mb-4">
            ❌ Without useCallback
          </h3>
          <ChildComponent onClick={handleClick} name="Without useCallback" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-green-600 mb-4">
            ✅ With useCallback
          </h3>
          <ChildComponent onClick={memoizedHandleClick} name="With useCallback" />
        </div>
      </div>
    </div>
  );
}

// Child component that shows re-renders
const ChildComponent = memo(({ onClick, name }) => {
  const [renderCount, setRenderCount] = useState(0);
  
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  return (
    <div className={`border-2 p-4 rounded ${
      renderCount > 1 ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
    }`}>
      <p className="font-bold mb-2">{name}</p>
      <p className="text-sm mb-4">
        Render count: <span className="font-bold text-lg">{renderCount}</span>
      </p>
      <button
        onClick={onClick}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Click Me
      </button>
      <p className="text-xs mt-2 text-gray-600">
        {renderCount > 1 
          ? '🔴 Re-rendering because onClick prop changed!' 
          : '🟢 Not re-rendering - onClick is memoized!'}
      </p>
    </div>
  );
});

// React.memo Demo
function ReactMemoDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [importantProp, setImportantProp] = useState('initial');
  
  const staticData = { message: 'This never changes' };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded">
        <p className="mb-4">Parent renders: {parentCount}</p>
        <button
          onClick={() => setParentCount(parentCount + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Re-render Parent
        </button>
        <button
          onClick={() => setImportantProp(`updated-${Date.now()}`)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Change Important Prop
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-red-600 mb-4">
            ❌ Regular Component
          </h3>
          <RegularComponent data={staticData} important={importantProp} />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-green-600 mb-4">
            ✅ Memoized Component
          </h3>
          <MemoizedComponent data={staticData} important={importantProp} />
        </div>
      </div>
    </div>
  );
}

// Regular component - always re-renders
function RegularComponent({ data, important }) {
  const [renderCount, setRenderCount] = useState(0);
  
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  return (
    <div className="border-2 border-red-500 bg-red-50 p-4 rounded">
      <p className="font-bold mb-2">Regular Component</p>
      <p className="text-sm mb-2">Renders: <span className="text-2xl font-bold">{renderCount}</span></p>
      <p className="text-xs text-gray-600 mb-2">Data: {data.message}</p>
      <p className="text-xs text-gray-600">Important: {important}</p>
      <p className="text-xs text-red-600 mt-2">
        🔴 Re-renders every time parent re-renders!
      </p>
    </div>
  );
}

// Memoized component - only re-renders when props change
const MemoizedComponent = memo(function MemoizedComponent({ data, important }) {
  const [renderCount, setRenderCount] = useState(0);
  
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  return (
    <div className="border-2 border-green-500 bg-green-50 p-4 rounded">
      <p className="font-bold mb-2">Memoized Component</p>
      <p className="text-sm mb-2">Renders: <span className="text-2xl font-bold">{renderCount}</span></p>
      <p className="text-xs text-gray-600 mb-2">Data: {data.message}</p>
      <p className="text-xs text-gray-600">Important: {important}</p>
      <p className="text-xs text-green-600 mt-2">
        🟢 Only re-renders when props actually change!
      </p>
    </div>
  );
});