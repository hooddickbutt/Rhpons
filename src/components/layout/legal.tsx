import { Disclaimer } from "@/components/layout/disclaimer";

export function Legal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm text-brass">Draft for counsel review. Not legal advice.</p>
      <h1 className="serif mt-3 text-5xl">{title}</h1>
      <div className="mt-8 space-y-4 text-sm leading-7 text-muted">{children}</div>
      <div className="mt-10">
        <Disclaimer />
      </div>
    </article>
  );
}
