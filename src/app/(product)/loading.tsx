export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-16 w-2/3" />
      <div className="skeleton h-48 w-full" />
    </div>
  );
}
