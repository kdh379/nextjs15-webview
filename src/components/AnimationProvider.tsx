"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";

function AnimationProvider({children}: { children: React.ReactNode }) {
  const [isFirstMounted, setIsFirstMounted] = React.useState(true);

  React.useEffect(() => {
    setIsFirstMounted(false);
  }, []);

  return (
    <AnimatePresence initial={isFirstMounted}>{children}</AnimatePresence>
  );
}

export default AnimationProvider;