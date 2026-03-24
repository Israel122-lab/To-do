import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. SETUP: Start the timer when component appears
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. CLEANUP: This runs when the component disappears
    return () => clearInterval(interval); 
  }, []); // Run only once on mount

  return <p>Timer: {seconds}s</p>;
}

export default Timer