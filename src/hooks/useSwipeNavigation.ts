import { AnimationControls } from "framer-motion";
import { useState, useCallback } from "react";

interface SwipeState {
  startX: number;
  currentX: number;
  isDragging: boolean;
}

interface UseSwipeNavigationProps {
  onSwipeBack: () => void;
  newPageControls: AnimationControls;
  cachedPageControls: AnimationControls;
  threshold?: number;
  edgeThreshold?: number;
}

interface UseSwipeNavigationReturn {
  swipeState: SwipeState;
  handlers: {
    handleTouchStart: (e: TouchEvent) => void;
    handleTouchMove: (e: TouchEvent) => void;
    handleTouchEnd: () => void;
  };
}

export function useSwipeNavigation({
  onSwipeBack,
  newPageControls,
  cachedPageControls,
  threshold = 0.3,
  edgeThreshold = 50,
}: UseSwipeNavigationProps): UseSwipeNavigationReturn {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    currentX: 0,
    isDragging: false,
  });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches[0].clientX > edgeThreshold) return; // 왼쪽 가장자리에서만 시작

    setSwipeState((prev) => ({
      ...prev,
      startX: e.touches[0].clientX,
      currentX: e.touches[0].clientX,
      isDragging: true,
    }));
  }, [edgeThreshold]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!swipeState.isDragging) return;

    const currentX = e.touches[0].clientX;
    const delta = currentX - swipeState.startX;

    if (delta > 0) {
      // 새 페이지와 캐시된 페이지를 동시에 이동
      newPageControls.set({ x: delta });
      cachedPageControls.set({ x: -100 + (delta / 3) }); // 캐시된 페이지는 더 천천히 이동
    }

    setSwipeState((prev) => ({ ...prev, currentX }));
  }, [swipeState.isDragging, swipeState.startX, newPageControls, cachedPageControls]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeState.isDragging) return;

    const delta = swipeState.currentX - swipeState.startX;
    const screenThreshold = window.innerWidth * threshold;

    if (delta > screenThreshold) {
      // 스와이프가 임계값을 넘으면 뒤로가기
      Promise.all([
        newPageControls.start({ x: window.innerWidth }),
        cachedPageControls.start({ x: 0 }),
      ]).then(() => {
        onSwipeBack();
      });
    } else {
      // 임계값을 넘지 못하면 원위치
      newPageControls.start({ x: 0 });
      cachedPageControls.start({ x: -100 });
    }

    setSwipeState((prev) => ({ ...prev, isDragging: false }));
  }, [swipeState, threshold, newPageControls, cachedPageControls, onSwipeBack]);

  return {
    swipeState,
    handlers: {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    },
  };
}