import { ToolTemplate } from '@/components/tools/ToolTemplate';
import { ContrastCheckerInteractive } from '@/components/tools/ContrastCheckerInteractive';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: "Font Contrast Checker - Free Online WCAG Tool | FontFusion",
  description: "Check the color contrast ratio of your foreground and background colors to ensure your typography meets WCAG accessibility guidelines.",
  path: "/tools/contrast"
});

export default function ContrastCheckerPage() {
  const howItWorks = (
    <>
      <p>
        The contrast checker calculates the luminance of the foreground (text) and background colors using the
        exact formula specified by the Web Content Accessibility Guidelines (WCAG) 2.1.
      </p>
      <p>
        Luminance is calculated based on the RGB values of your selected hex codes. The ratio is then determined
        by dividing the luminance of the lighter color by the luminance of the darker color. The resulting number
        is a ratio (e.g., 4.5:1) which dictates whether the combination passes accessibility thresholds.
      </p>
    </>
  );

  const faqs = [
    {
      question: "What is a good contrast ratio for text?",
      answer: "WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold). WCAG AAA requires 7:1 for normal text."
    },
    {
      question: "Why does contrast matter for typography?",
      answer: "Adequate contrast ensures that text is readable for people with low vision, color blindness, or those viewing screens in bright environments."
    },
    {
      question: "What is considered 'Large Text'?",
      answer: "WCAG defines large text as 18pt (typically 24px) or 14pt (typically 18.66px) if it is bold."
    }
  ];

  const relatedTools = [
    { title: "Browse Font Pairings", href: "/browse" },
    { title: "Typography Generator", href: "/generator" },
  ];

  return (
    <ToolTemplate
      title="Font Contrast Checker"
      description="Ensure your font color combinations are accessible and readable."
      toolComponent={<ContrastCheckerInteractive />}
      howItWorks={howItWorks}
      faqs={faqs}
      relatedTools={relatedTools}
    />
  );
}
