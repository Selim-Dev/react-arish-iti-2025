import React, { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    for (let i = 0; i < 5; i++) {
      setCount(count + 1);
    }
  };

  return (
    <div>
      Count: {count}
      <button onClick={handleClick} className="btn btn-xs rounded">
        +5
      </button>
    </div>
  );
}
