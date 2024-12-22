"use client";

import { NavigationDirection, useRouterStack } from "@/components/StackRouterProvider";
import { motion, useAnimation, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { direction, back, isSwipeTransition, setIsSwipeTransition } = useRouterStack();
  const containerRef = useRef<HTMLDivElement>(null);
  const newPageControls = useAnimation();
  const cachedPageControls = useAnimation();

  const { swipeState, handlers } = useSwipeNavigation({
    onSwipeBack: () => {
      setIsSwipeTransition(true);
      back();
    },
    newPageControls,
    cachedPageControls,
  });

  useEffect(() => {
    setIsSwipeTransition(false);
  }, [pathname, setIsSwipeTransition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handlers.handleTouchStart);
    container.addEventListener("touchmove", handlers.handleTouchMove);
    container.addEventListener("touchend", handlers.handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handlers.handleTouchStart);
      container.removeEventListener("touchmove", handlers.handleTouchMove);
      container.removeEventListener("touchend", handlers.handleTouchEnd);
    };
  }, [handlers]);

  // 페이지 전환 애니메이션 변형
  const pageTransitionVariants: Variants = {
    initial: (direction: NavigationDirection) => ({
      x: direction === "forward" ? "100vw" : "-100vw",
      position: "absolute",
    }),
    animate: {
      x: 0,
      position: "relative",
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const cachedPageVariants: Variants = {
    initial: {
      x: 0,
      position: "relative",
    },
    animate: (direction: NavigationDirection) => ({
      x: direction === "forward" ? "-100vw" : "100vw",
      position: "absolute",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };


  return (
    <div className="flex relative overflow-hidden">
      {/* 현재 페이지 */}
      <motion.div
        ref={containerRef}
        key={`page-${pathname}`}
        custom={direction}
        variants={pageTransitionVariants}
        initial={isSwipeTransition ? false : "initial"}
        animate={swipeState.isDragging ? newPageControls : "animate"}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1], // easeOutQuart
        }}
        className="w-full min-h-screen bg-white"
      >
        {children}
      </motion.div>

      {/* 캐시된 페이지 - 첫 페이지가 아닐 때만 표시 */}
      <motion.div
        key={`cache-${pathname}`}
        custom={direction}
        variants={swipeState.isDragging ? undefined : cachedPageVariants}
        initial={isSwipeTransition ? false : "initial"}
        animate={swipeState.isDragging ? cachedPageControls : "animate"}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1], // easeOutQuart
        }}
        className="w-full absolute top-0 left-0"
      >
        {"cache page"}
      </motion.div>
    </div>
  );
}

export default Template;