import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy | FontFusion",
  description: "Privacy Policy for FontFusion.",
  path: "/privacy-policy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
