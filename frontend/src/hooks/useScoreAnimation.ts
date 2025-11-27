import { useEffect, useRef, useState } from 'react';

const GOLDEN_FRUIT_POINTS = 5;

export const useScoreAnimation = (currentScore: number) => {
  const [isGolden, setIsGolden] = useState(false);
  const prevScoreRef = useRef(currentScore);

  useEffect(() => {
    const scoreDiff = currentScore - prevScoreRef.current;

    if (scoreDiff === GOLDEN_FRUIT_POINTS) {
      setIsGolden(true);
      setTimeout(() => setIsGolden(false), 800);
    }

    prevScoreRef.current = currentScore;
  }, [currentScore]);

  return { isGolden };
};
