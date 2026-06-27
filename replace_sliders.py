with open("src/app/generator/page.tsx", "r") as f:
    content = f.read()

old_sliders = '''        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Font Size</label>
              <span className="text-sm text-zinc-500">{fontSize[0]}%</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={80}
              max={150}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Line Height</label>
              <span className="text-sm text-zinc-500">{lineHeight[0]}%</span>
            </div>
            <Slider
              value={lineHeight}
              onValueChange={setLineHeight}
              min={120}
              max={200}
              step={5}
            />
          </div>
        </div>'''

new_sliders = '''        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Heading Size</label>
              <span className="text-sm text-zinc-500">{headingSize[0]}px</span>
            </div>
            <Slider
              value={headingSize}
              onValueChange={setHeadingSize}
              min={24}
              max={96}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Body Size</label>
              <span className="text-sm text-zinc-500">{bodySize[0]}px</span>
            </div>
            <Slider
              value={bodySize}
              onValueChange={setBodySize}
              min={12}
              max={24}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Heading Weight</label>
              <span className="text-sm text-zinc-500">{headingWeight[0]}</span>
            </div>
            <Slider
              value={headingWeight}
              onValueChange={setHeadingWeight}
              min={100}
              max={900}
              step={100}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Body Weight</label>
              <span className="text-sm text-zinc-500">{bodyWeight[0]}</span>
            </div>
            <Slider
              value={bodyWeight}
              onValueChange={setBodyWeight}
              min={100}
              max={900}
              step={100}
            />
          </div>
        </div>'''

content = content.replace(old_sliders, new_sliders)

with open("src/app/generator/page.tsx", "w") as f:
    f.write(content)
