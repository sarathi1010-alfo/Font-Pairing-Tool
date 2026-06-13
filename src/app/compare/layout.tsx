import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Compare Font Pairings | FontPair",
  description: "Compare multiple font combinations side-by-side to find the perfect typography for your next design project.",
  path: "/compare",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
