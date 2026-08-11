import { useState } from 'react';

export default function HealthCheckIsland() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="text-lg text-green-400 mb-3">✓ React is hydrated correctly</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          type="button"
        >
          Click me
        </button>
        <span className="text-gray-300">
          Count: <span className="font-mono font-bold">{count}</span>
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Client-side hydration successful</p>
    </div>
  );
}
