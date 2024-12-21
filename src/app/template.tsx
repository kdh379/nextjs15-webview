"use client";

import { NavigationDirection, useRouterStack } from "@/components/StackRouterProvider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

function Template({ children } : { children: React.ReactNode }) {
  const pathname = usePathname();
  const { direction } = useRouterStack();

  return (
    <div className="flex relative">
      <motion.div
        key={`current-${pathname}`}
        custom={direction}
        variants={{
          initial: {
            x: 0,
            position: "relative",
          },
          exit: (direction: NavigationDirection) => ({
            x: direction === "forward" ? "-100vw" : "100vw",
            position: "absolute",
          }),
        }}
        initial="initial"
        animate="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        {"cache page"}
      </motion.div>

      <motion.div
        key={`new-${pathname}`}
        custom={direction}
        variants={{
          initial: (direction: NavigationDirection) => ({
            x: direction === "forward" ? "100vw" : "-100vw",
            position: "absolute",
          }),
          animate: {
            x: 0,
            position: "relative",
          },
        }}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Template;