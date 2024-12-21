"use client";

import { useTransition } from "react";
import NextLink from "next/link";
import { useRouterStack } from "./StackRouterProvider";

/**
 * Next.js App Router의 Navigation은 React Transition으로 동작합니다.
 * useTransition을 사용하여 페이지 이동을 감지할 수 있습니다.
 * https://github.com/vercel/next.js/discussions/41934#discussioncomment-8996669
 */
export function Link({
  href,
  children,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouterStack();
  const [, startTransition] = useTransition();

  const handleRouteChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      const url = href.toString();
      router.push(url);
    });
  };

  return (
    <NextLink
      href={href}
      onClick={handleRouteChange}
      {...rest}
    >
      {children}
    </NextLink>
  );
}