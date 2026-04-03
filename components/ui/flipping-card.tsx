"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
}: FlippingCardProps) {
  return (
    <div className={cn("group/flip [perspective:1200px]", className)}>
      <div
        className="relative w-full h-full rounded-2xl border border-white/5 shadow-lg transition-transform duration-700 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]"
      >
        {/* Front Face */}
        <div className="absolute inset-0 rounded-[inherit] overflow-hidden [backface-visibility:hidden]">
          {frontContent}
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 rounded-[inherit] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </div>
    </div>
  );
}
