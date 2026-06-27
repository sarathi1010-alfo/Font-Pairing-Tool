import re

with open("src/app/generator/page.tsx", "r") as f:
    content = f.read()

old_system_def = '''  const system = headingFontData && bodyFontData
    ? generateTypographySystem(headingFontData, bodyFontData)
    : null;'''

new_system_def = '''  let system = headingFontData && bodyFontData
    ? generateTypographySystem(headingFontData, bodyFontData)
    : null;

  if (system) {
    system = {
      ...system,
      heading: { ...system.heading, weight: headingWeight[0] },
      body: { ...system.body, weight: bodyWeight[0] },
      scale: {
        ...system.scale,
        sizes: {
          ...system.scale.sizes,
          '4xl': `${headingSize[0]}px`,
          base: `${bodySize[0]}px`,
        }
      }
    };
  }'''

content = content.replace(old_system_def, new_system_def)

old_specimen = '''          {/* Typography Specimen */}
          <div
            className="space-y-10 transition-all duration-200"
            style={{
              transform: `scale(${fontSize[0] / 100})`,
              transformOrigin: 'top left',
              width: `${100 / (fontSize[0] / 100)}%`
            }}
          >
            <div>
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-50"
                style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
              >
                The quick brown fox jumps over the lazy dog.
              </h1>
              <p
                className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl"
                style={{
                  fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                  lineHeight: lineHeight[0] / 100
                }}
              >'''

new_specimen = '''          {/* Typography Specimen */}
          <div className="space-y-10 transition-all duration-200">
            <div>
              <h1
                className="tracking-tight mb-4 text-zinc-900 dark:text-zinc-50"
                style={{
                  fontFamily: `"${currentPair.headingFont}", sans-serif`,
                  fontSize: `${headingSize[0]}px`,
                  fontWeight: headingWeight[0],
                  lineHeight: 1.1
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </h1>
              <p
                className="text-zinc-600 dark:text-zinc-400 max-w-3xl"
                style={{
                  fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                  fontSize: `${bodySize[0]}px`,
                  fontWeight: bodyWeight[0],
                  lineHeight: 1.5
                }}
              >'''

content = content.replace(old_specimen, new_specimen)

old_h2 = '''              <div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                >
                  Clear Hierarchy
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    lineHeight: lineHeight[0] / 100
                  }}
                >
                  Establishing hierarchy is one of the primary goals of typography. By pairing <strong>{currentPair.headingFont}</strong> and <strong>{currentPair.bodyFont}</strong>, you create a distinct visual separation between the structural elements of your page and the long-form content.
                </p>
                <p
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    lineHeight: lineHeight[0] / 100
                  }}
                >
                  Notice how the heading font draws the eye, while the body font recedes to allow for comfortable reading. {currentPair.description}
                </p>
              </div>'''

new_h2 = '''              <div>
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: `"${currentPair.headingFont}", sans-serif`,
                    fontSize: `${Math.max(24, headingSize[0] * 0.5)}px`,
                    fontWeight: headingWeight[0]
                  }}
                >
                  Clear Hierarchy
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    fontSize: `${bodySize[0]}px`,
                    fontWeight: bodyWeight[0],
                    lineHeight: 1.5
                  }}
                >
                  Establishing hierarchy is one of the primary goals of typography. By pairing <strong>{currentPair.headingFont}</strong> and <strong>{currentPair.bodyFont}</strong>, you create a distinct visual separation between the structural elements of your page and the long-form content.
                </p>
                <p
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    fontSize: `${bodySize[0]}px`,
                    fontWeight: bodyWeight[0],
                    lineHeight: 1.5
                  }}
                >
                  Notice how the heading font draws the eye, while the body font recedes to allow for comfortable reading. {currentPair.description}
                </p>
              </div>'''

content = content.replace(old_h2, new_h2)

old_h3 = '''              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                >
                  UI Element Preview
                </h3>
                <p
                  className="text-sm mb-6 text-zinc-500"
                  style={{ fontFamily: `"${currentPair.bodyFont}", sans-serif` }}
                >
                  How this looks in a product card or small component.
                </p>
                <div className="space-y-4">
                  <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full mb-4"></div>
                  <h4
                    className="font-bold text-lg"
                    style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                  >
                    Project Alpha
                  </h4>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                      lineHeight: lineHeight[0] / 100
                    }}
                  >
                    A brief description of the project goes here, utilizing the body font at a smaller size.
                  </p>
                  <Button className="w-full mt-2" style={{ fontFamily: `"${currentPair.bodyFont}", sans-serif` }}>
                    View Details
                  </Button>
                </div>
              </div>'''

new_h3 = '''              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: `"${currentPair.headingFont}", sans-serif`,
                    fontSize: `${Math.max(20, headingSize[0] * 0.4)}px`,
                    fontWeight: headingWeight[0]
                  }}
                >
                  UI Element Preview
                </h3>
                <p
                  className="mb-6 text-zinc-500"
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    fontSize: `${Math.max(12, bodySize[0] * 0.875)}px`,
                    fontWeight: bodyWeight[0]
                  }}
                >
                  How this looks in a product card or small component.
                </p>
                <div className="space-y-4">
                  <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full mb-4"></div>
                  <h4
                    style={{
                      fontFamily: `"${currentPair.headingFont}", sans-serif`,
                      fontSize: `${Math.max(18, headingSize[0] * 0.35)}px`,
                      fontWeight: headingWeight[0]
                    }}
                  >
                    Project Alpha
                  </h4>
                  <p
                    style={{
                      fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                      fontSize: `${Math.max(12, bodySize[0] * 0.875)}px`,
                      fontWeight: bodyWeight[0],
                      lineHeight: 1.5
                    }}
                  >
                    A brief description of the project goes here, utilizing the body font at a smaller size.
                  </p>
                  <Button className="w-full mt-2" style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    fontSize: `${Math.max(12, bodySize[0] * 0.875)}px`,
                    fontWeight: bodyWeight[0]
                  }}>
                    View Details
                  </Button>
                </div>
              </div>'''

content = content.replace(old_h3, new_h3)

with open("src/app/generator/page.tsx", "w") as f:
    f.write(content)
