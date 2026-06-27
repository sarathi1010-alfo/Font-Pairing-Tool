with open("src/components/LiveWebsitePreview.tsx", "r") as f:
    content = f.read()

# Add useState import
content = content.replace("import React from 'react';", "import React, { useState } from 'react';")

# Add Sun/Moon imports
content = content.replace("import { CheckCircle2, Shield, Zap } from 'lucide-react';", "import { CheckCircle2, Shield, Zap, Sun, Moon } from 'lucide-react';")

# Update component signature and add state
old_sig = '''export function LiveWebsitePreview({ system }: LiveWebsitePreviewProps) {
  const { heading, body, scale } = system;'''

new_sig = '''export function LiveWebsitePreview({ system }: LiveWebsitePreviewProps) {
  const { heading, body, scale } = system;
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  const isDark = previewMode === 'dark';'''

content = content.replace(old_sig, new_sig)

# Replace static classNames with dynamic ones
# Find all classNames and manually update them to remove `dark:` and use conditional logic

replacements = [
    (
        'className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"',
        'className={`w-full border rounded-xl overflow-hidden shadow-sm transition-colors ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}`}'
    ),
    (
        'className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-2"',
        'className={`px-4 py-3 flex items-center gap-2 border-b transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}'
    ),
    (
        'className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80"',
        'className={`w-3 h-3 rounded-full ${isDark ? "bg-red-500/80" : "bg-red-400"}`}'
    ),
    (
        'className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/80"',
        'className={`w-3 h-3 rounded-full ${isDark ? "bg-amber-500/80" : "bg-amber-400"}`}'
    ),
    (
        'className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80"',
        'className={`w-3 h-3 rounded-full ${isDark ? "bg-green-500/80" : "bg-green-400"}`}'
    ),
    (
        'className="mx-auto bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 text-xs px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2"',
        'className={`mx-auto text-xs px-3 py-1 rounded-md border shadow-sm flex items-center gap-2 transition-colors ${isDark ? "bg-zinc-950 text-zinc-500 border-zinc-800" : "bg-white text-zinc-400 border-zinc-200"}`}'
    ),
    (
        'className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 mb-8 border border-zinc-200 dark:border-zinc-800"',
        'className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 border transition-colors ${isDark ? "bg-zinc-900 text-zinc-200 border-zinc-800" : "bg-zinc-100 text-zinc-800 border-zinc-200"}`}'
    ),
    (
        'className="mb-6 text-zinc-900 dark:text-zinc-50"',
        'className={`mb-6 transition-colors ${isDark ? "text-zinc-50" : "text-zinc-900"}`}'
    ),
    (
        'className="mb-10 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"',
        'className={`mb-10 max-w-2xl mx-auto transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}'
    ),
    (
        'className="px-6 py-6 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"',
        'className={`px-6 py-6 rounded-full transition-colors ${isDark ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}'
    ),
    (
        'className="px-6 py-6 rounded-full border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-100"',
        'className={`px-6 py-6 rounded-full bg-transparent transition-colors ${isDark ? "border-zinc-800 text-zinc-100" : "border-zinc-200 text-zinc-900"}`}'
    ),
    (
        'className="bg-zinc-50 dark:bg-zinc-900/50 px-6 py-16 border-t border-zinc-200 dark:border-zinc-800"',
        'className={`px-6 py-16 border-t transition-colors ${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}'
    ),
    (
        'className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"',
        'className={`p-6 rounded-2xl border shadow-sm transition-colors ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}`}'
    ),
    (
        'className="w-8 h-8 text-zinc-900 dark:text-zinc-100 mb-4"',
        'className={`w-8 h-8 mb-4 transition-colors ${isDark ? "text-zinc-100" : "text-zinc-900"}`}'
    ),
    (
        'className="mb-2 text-zinc-900 dark:text-zinc-50"',
        'className={`mb-2 transition-colors ${isDark ? "text-zinc-50" : "text-zinc-900"}`}'
    ),
    (
        'className="text-zinc-600 dark:text-zinc-400"',
        'className={`transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}'
    )
]

for old, new in replacements:
    content = content.replace(old, new)


# Add a toggle button for Light/Dark mode above the Preview chrome.
# We will insert it inside the outermost div.
old_chrome = '''      {/* Browser Chrome Mockup */}
      <div className={`px-4 py-3 flex items-center gap-2 border-b transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
        <div className="flex gap-1.5">'''

new_chrome = '''      {/* Browser Chrome Mockup */}
      <div className={`px-4 py-3 flex items-center justify-between border-b transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
        <div className="flex gap-1.5">
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-red-500/80" : "bg-red-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-amber-500/80" : "bg-amber-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-green-500/80" : "bg-green-400"}`} />
        </div>
        <div className={`text-xs px-3 py-1 rounded-md border shadow-sm flex items-center gap-2 transition-colors ${isDark ? "bg-zinc-950 text-zinc-500 border-zinc-800" : "bg-white text-zinc-400 border-zinc-200"}`}>
          <Shield className="w-3 h-3" />
          <span>acme-startup.io</span>
        </div>
        <div>
          <button
            onClick={() => setPreviewMode(isDark ? 'light' : 'dark')}
            className={`flex items-center justify-center p-1.5 rounded-md border transition-colors ${isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100'}`}
            title="Toggle Preview Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>'''

content = content.replace('''      {/* Browser Chrome Mockup */}
      <div className={`px-4 py-3 flex items-center gap-2 border-b transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
        <div className="flex gap-1.5">
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-red-500/80" : "bg-red-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-amber-500/80" : "bg-amber-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-green-500/80" : "bg-green-400"}`} />
        </div>
        <div className={`mx-auto text-xs px-3 py-1 rounded-md border shadow-sm flex items-center gap-2 transition-colors ${isDark ? "bg-zinc-950 text-zinc-500 border-zinc-800" : "bg-white text-zinc-400 border-zinc-200"}`}>
          <Shield className="w-3 h-3" />
          <span>acme-startup.io</span>
        </div>
      </div>''', new_chrome)


with open("src/components/LiveWebsitePreview.tsx", "w") as f:
    f.write(content)
