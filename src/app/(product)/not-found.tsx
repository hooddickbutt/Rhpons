import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl py-10">
      <p className="text-sm text-muted">404</p>
      <h1 className="serif mt-3 text-5xl">That page is not here</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Example payment names are listed in Explore. A wallet address can also open a profile.
      </p>
      <Button href="/explore" className="mt-6">
        Explore
      </Button>
    </div>
  );
}
