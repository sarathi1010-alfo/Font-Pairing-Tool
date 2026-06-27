import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | FontFusion",
  description: "Get in touch with the FontFusion team.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
