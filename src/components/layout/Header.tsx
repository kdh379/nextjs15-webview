"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouterStack } from "@/components/StackRouterProvider";
import { usePathname } from "next/navigation";

function Header() {
  const router = useRouterStack();
  const pathname = usePathname();

  return (
    <nav className="h-12 flex items-center gap-4 border-b shadow-md mb-4 p-4">
      {pathname !== "/" && <Button variant={"ghost"} size={"icon"} onClick={router.back}>
        <ChevronLeft />
      </Button>}

      <h1 className="font-bold">Next.js App</h1>
    </nav>
  );
}

export default Header;