import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[60vh]">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold">Font Pairing Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The typography pair or guide you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Return to Font Fusion
      </Link>
    </div>
  );
}
