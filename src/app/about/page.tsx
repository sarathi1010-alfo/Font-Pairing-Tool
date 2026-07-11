import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Heart, Shield, Zap } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About FontFusion | Our Mission & Typography Philosophy",
  description: "Learn about FontFusion, the fastest font pairing tool for designers and founders. Discover our mission to make professional typography accessible to everyone.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-zinc-950 dark:text-zinc-50 max-w-3xl mx-auto">
          We believe great design starts with great typography.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          FontFusion was built to solve the "blank page" problem. We help designers, developers, and founders find the perfect font pairs in seconds, not hours.
        </p>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400">
              <p>
                Typography is the soul of a design. It carries the weight of the brand, ensures the clarity of the message, and sets the emotional tone for the entire user experience. Yet, for many, choosing fonts is a process of trial and error that takes away from the creative flow.
              </p>
              <p>
                At FontFusion, our mission is to democratize professional-grade typography. We provide high-speed, intuitive tools that bridge the gap between technical font selection and creative vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why FontFusion? */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why FontFusion?</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg h-fit">
                  <Zap className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Speed First</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">No more manual font-swapping in design tools. Generate and preview pairs instantly in the browser.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg h-fit">
                  <Shield className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Production Ready</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Every pair we recommend is available on Google Fonts, making implementation as simple as copying a CSS link.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg h-fit">
                  <Heart className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Human Centric</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">We prioritize accessibility and readability, ensuring your typography works for everyone, on every device.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-8 aspect-square flex flex-col justify-center">
             <div className="space-y-4">
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="pt-8">
                   <h4 className="text-2xl font-bold mb-2 font-serif italic text-zinc-400">Playfair Display</h4>
                   <p className="text-zinc-500 font-sans">Paired with Inter for a modern editorial feel.</p>
                </div>
                <div className="pt-4">
                   <h4 className="text-2xl font-bold mb-2 font-mono text-zinc-400">Space Grotesk</h4>
                   <p className="text-zinc-500 font-sans">A technical, futuristic approach to branding.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 text-center">
        <div className="bg-black text-white rounded-3xl py-16 px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your perfect pair?</h2>
          <p className="text-xl text-zinc-400 mb-10">Start using the tool that helps thousands of designers every day.</p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full">
            <Link href="/generator">
              Try the Generator
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
