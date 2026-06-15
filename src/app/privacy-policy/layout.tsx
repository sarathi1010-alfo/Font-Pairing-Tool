import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy | FontPair",
  description: "Privacy Policy for FontPair.",
  path: "/privacy-policy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
