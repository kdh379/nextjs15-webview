import { AnimationControls } from "framer-motion";
import { useCallback, useRef } from "react";

interface SwipeBackOptions {
  onSwipeBack: () => void;
  controls: AnimationControls;
  threshold?: number;
}

export function useSwipeBack({
  onSwipeBack,
  controls,
  threshold = 0.3,
}: SwipeBackOptions) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches[0].clientX > 50) return; // 왼쪽 가장자리에서만 시작

    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;

    currentX.current = e.touches[0].clientX;
    const delta = currentX.current - startX.current;

    if (delta > 0) {
      controls.set({ x: delta });
    }
  }, [controls]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;

    const delta = currentX.current - startX.current;
    const screenWidth = window.innerWidth;

    if (delta > screenWidth * threshold) {
      controls.start({ x: screenWidth }).then(() => {
        onSwipeBack();
      });
    } else {
      controls.start({ x: 0 });
    }

    isDragging.current = false;
  }, [controls, onSwipeBack, threshold]);

  return {
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}