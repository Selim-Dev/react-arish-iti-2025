import { useState, useEffect } from "react";

export default function Test() {
  const [count1, setCount1] = useState(0);  // does NOT trigger effect
  const [count2, setCount2] = useState(0);  // DOES trigger effect

  /* ────────────────────────────────────────────────
     useEffect playground
     1. no deps array      → after first render + every render
     2. [] empty array     → only after first render
     3. [count2] with deps → after first render + whenever count2 changes
     Cleanup always runs   → before next effect OR on unmount
  ──────────────────────────────────────────────── */
  useEffect(() => {
    console.log("Effect");

    // Cleanup function
    return () => {
      console.log("Cleanup");
    };
  }, [count2]);                     // ← try [], [count1], or omit entirely

  console.log("render");

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <p>count1 (no effect): {count1}</p>
      <button onClick={() => setCount1(c => c + 1)}>+1 to count1</button>

      <p style={{ marginTop: 16 }}>count2 (triggers effect): {count2}</p>
      <button onClick={() => setCount2(c => c + 1)}>+1 to count2</button>
    </div>
  );
}
