import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Browse Font Pairings | FontPair",
  description: "Browse our curated collection of beautiful font pairings. Filter by mood, category, and style.",
  path: "/browse",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
