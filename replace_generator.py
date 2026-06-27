import re

with open("src/app/generator/page.tsx", "r") as f:
    content = f.read()

# Add useSearchParams to imports
content = content.replace('import { useState } from "react";', 'import { useState, Suspense } from "react";\nimport { useSearchParams } from "next/navigation";')

# Rename default export function GeneratorPage to GeneratorContent and add searchParams logic
content = content.replace('export default function GeneratorPage() {', 'function GeneratorContent() {\n  const searchParams = useSearchParams();\n  const pairSlug = searchParams.get("pair");')

# Update initial state of currentPair
old_state = '  const [currentPair, setCurrentPair] = useState<FontPair>(allPairs[0]);\n  const [headingFontData, setHeadingFontData] = useState<Font | undefined>(allFonts.find(f => f.name === allPairs[0].headingFont));\n  const [bodyFontData, setBodyFontData] = useState<Font | undefined>(allFonts.find(f => f.name === allPairs[0].bodyFont));'

new_state = '''  const initialPair = pairSlug ? (allPairs.find(p => p.slug === pairSlug) || allPairs[0]) : allPairs[0];
  const [currentPair, setCurrentPair] = useState<FontPair>(initialPair);
  const [headingFontData, setHeadingFontData] = useState<Font | undefined>(allFonts.find(f => f.name === initialPair.headingFont));
  const [bodyFontData, setBodyFontData] = useState<Font | undefined>(allFonts.find(f => f.name === initialPair.bodyFont));'''

content = content.replace(old_state, new_state)

# Add default export GeneratorPage that wraps GeneratorContent in Suspense
suspense_wrapper = '''
export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Loading generator...</div>}>
      <GeneratorContent />
    </Suspense>
  );
}
'''
content = content + suspense_wrapper

with open("src/app/generator/page.tsx", "w") as f:
    f.write(content)
