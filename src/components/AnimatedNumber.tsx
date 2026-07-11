import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number; // duration in seconds
  formatter?: (val: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  suffix = "",
  duration = 1.6,
  formatter = (val) => Math.floor(val).toString(),
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Keep formatter in a ref to avoid re-triggering the animation effect
  const formatterRef = useRef(formatter);
  useEffect(() => {
    formatterRef.current = formatter;
  }, [formatter]);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000; // in seconds
      const progress = Math.min(elapsed / duration, 1);
      
      // Premium cubic-bezier like ease-out (expo/quart hybrid)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = start + (end - start) * easeProgress;

      setDisplayValue(formatterRef.current(currentVal));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(formatterRef.current(end));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};
