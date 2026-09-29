import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24">
        <p className="text-sm text-muted">404</p>
        <h1 className="serif mt-3 text-5xl">That page is not here</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          The link may be mistyped, or the payment name is not an example profile or a wallet
          address.
        </p>
        <Button href="/" className="mt-6">
          Go home
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
