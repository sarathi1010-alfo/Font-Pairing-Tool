import re

with open("src/app/generator/page.tsx", "r") as f:
    content = f.read()

old_state = '''  // Settings
  const [fontSize, setFontSize] = useState([100]); // Percentage
  const [lineHeight, setLineHeight] = useState([150]); // Percentage'''

new_state = '''  // Settings
  const [headingSize, setHeadingSize] = useState([48]);
  const [bodySize, setBodySize] = useState([16]);
  const [headingWeight, setHeadingWeight] = useState([700]);
  const [bodyWeight, setBodyWeight] = useState([400]);'''

content = content.replace(old_state, new_state)

with open("src/app/generator/page.tsx", "w") as f:
    f.write(content)
