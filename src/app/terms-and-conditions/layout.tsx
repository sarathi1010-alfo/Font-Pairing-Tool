import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms and Conditions | FontPair",
  description: "Terms and Conditions for FontPair.",
  path: "/terms-and-conditions",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
