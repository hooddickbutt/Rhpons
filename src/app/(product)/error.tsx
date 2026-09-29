"use client";

import { Button } from "@/components/ui/button";

export default function ProductError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="surface mx-auto max-w-xl p-8">
      <h1 className="serif text-4xl">Something failed to load</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        The page could not be rendered. Your wallet was not asked to sign.
      </p>
      <Button className="mt-5" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
