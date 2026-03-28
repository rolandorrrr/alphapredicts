"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BannerContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  if (success) {
    return (
      <div className="bg-secondary/10 border-b border-secondary/30 text-secondary px-6 py-4 text-center font-bold uppercase tracking-widest text-sm">
        Welcome to Alpha Pro. Your subscription is now active.
      </div>
    );
  }

  if (canceled) {
    return (
      <div className="bg-error/10 border-b border-error/30 text-error px-6 py-4 text-center font-bold uppercase tracking-widest text-sm">
        Checkout was canceled. You can try again anytime.
      </div>
    );
  }

  return null;
}

export default function StatusBanner() {
  return (
    <Suspense fallback={null}>
      <BannerContent />
    </Suspense>
  );
}
