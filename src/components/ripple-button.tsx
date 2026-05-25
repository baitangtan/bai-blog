"use client";

import type { ReactNode } from "react";

export function RippleButton({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:currentColor;opacity:0.15;transform:scale(0);animation:ripple .6s ease-out;pointer-events:none;`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  return (
    <a href={href} className={`relative overflow-hidden ${className ?? ""}`} onClick={handleClick}>
      {children}
    </a>
  );
}
