import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | FontPair",
  description: "Get in touch with the FontPair team.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
