import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Font Generator | FontPair",
  description: "Generate and test font pairings on live UI components. Find the perfect typography stack for your website.",
  path: "/generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
