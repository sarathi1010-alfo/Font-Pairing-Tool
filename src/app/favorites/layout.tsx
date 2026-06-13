import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Your Saved Font Pairings | FontPair",
  description: "View and manage your saved font combinations.",
  path: "/favorites",
  noIndex: true, // we already disallow in robots.txt, but it's good practice
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
