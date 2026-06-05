import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Layers } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Layers className="h-5 w-5" />
          <span>FontPair</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/generator" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Generator</Link>
          <Link href="/browse" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Browse Fonts</Link>
          <Link href="/favorites" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Favorites</Link>
          <Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Guides</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
