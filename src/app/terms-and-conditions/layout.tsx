import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms and Conditions | FontFusion",
  description: "Terms and Conditions for FontFusion.",
  path: "/terms-and-conditions",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
