"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export type NavigationDirection = "forward" | "backward";

interface StackRouterContextType {
  stack: string[];
  direction: NavigationDirection;
  isSwipeTransition: boolean;
  push: (path: string) => void;
  back: () => void;
  replace: (path: string) => void;
  setIsSwipeTransition: (value: boolean) => void;
}

const StackRouterContext = createContext<StackRouterContextType | null>(null);

export function useRouterStack() {
  const context = useContext(StackRouterContext);
  if (!context) {
    throw new Error("useRouterStack must be used within a StackRouterProvider");
  }
  return context;
}

interface StackRouterProviderProps {
  children: React.ReactNode;
  initialPath?: string;
}

export function StackRouterProvider({ children, initialPath }: StackRouterProviderProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const [stack, setStack] = useState<string[]>([initialPath || currentPath]);
  const [direction, setDirection] = useState<NavigationDirection>("forward");
  const [isSwipeTransition, setIsSwipeTransition] = useState(false);

  useEffect(() => {
    if (currentPath !== stack[stack.length - 1]) {
      setStack((prev) => [...prev, currentPath]);
      setDirection("forward");
    }
  }, [currentPath, stack]);

  const push = (path: string) => {
    setDirection("forward");
    setStack((prev) => [...prev, path]);
    router.push(path);
  };

  const back = () => {
    if (stack.length > 1) {
      setDirection("backward");
      const newStack = [...stack];
      newStack.pop();
      const previousPath = newStack[newStack.length - 1];
      setStack(newStack);
      router.push(previousPath);
    }
  };

  const replace = (path: string) => {
    setDirection("forward");
    setStack((prev) => [...prev.slice(0, -1), path]);
    router.replace(path);
  };

  const value: StackRouterContextType = {
    stack,
    direction,
    isSwipeTransition,
    push,
    back,
    replace,
    setIsSwipeTransition,
  };

  return (
    <StackRouterContext.Provider value={value}>
      {children}
    </StackRouterContext.Provider>
  );
}