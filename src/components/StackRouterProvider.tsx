"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export type NavigationDirection = "forward" | "backward";

interface RouterContextType {
  direction: NavigationDirection;
  push: (url: string) => void;
  back: () => void;
}

const StackRouterContext = React.createContext<RouterContextType | null>(null);

function StackRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [direction, setDirection] = React.useState<NavigationDirection>("forward");
  const router = useRouter();

  const push = useCallback((url: string) => {
    setDirection("forward");
    router.push(url);
  }, [router] );

  const back = useCallback(() => {
    setDirection("backward");
    router.back();
  }, [router]);

  return (
    <StackRouterContext.Provider value={{ direction, push, back }}>
      {children}
    </StackRouterContext.Provider>
  );
}

const useRouterStack = () => {
  const context = React.useContext(StackRouterContext);

  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }

  return context;
};

export { StackRouterProvider, useRouterStack };