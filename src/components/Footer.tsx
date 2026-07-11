import Link from "next/link";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4">
              <Layers className="h-5 w-5" />
              <span>FontFusion</span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm">
              A fast, beautiful font pairing tool that helps designers and founders discover, compare, and save the perfect typography combinations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Tool</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/generator" className="hover:text-zinc-900 dark:hover:text-zinc-50">Generator</Link></li>
              <li><Link href="/browse" className="hover:text-zinc-900 dark:hover:text-zinc-50">Browse Fonts</Link></li>
              <li><Link href="/compare" className="hover:text-zinc-900 dark:hover:text-zinc-50">Compare</Link></li>
              <li><Link href="/pairings" className="hover:text-zinc-900 dark:hover:text-zinc-50">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-50">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-50">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-50">Guides</Link></li>
              <li><Link href="/favorites" className="hover:text-zinc-900 dark:hover:text-zinc-50">Saved Pairs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} FontFusion. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-zinc-900 dark:hover:text-zinc-50">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-zinc-900 dark:hover:text-zinc-50">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
