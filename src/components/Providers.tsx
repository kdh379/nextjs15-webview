import React from "react";
import { StackRouterProvider } from "./StackRouterProvider";
import AnimationProvider from "./AnimationProvider";
import Header from "@/components/layout/Header";

function Providers({children}: { children: React.ReactNode }) {
  return (
    <StackRouterProvider>
      <Header />
      <AnimationProvider>
        {children}
      </AnimationProvider>
    </StackRouterProvider>
  );
}

export default Providers;