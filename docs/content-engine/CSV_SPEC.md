# Programmatic CSV Mapping

To scale FontFusion, we use CSV files mapped to our MDX templates. Below are the required column headers for each page type.

## 1. Comparison Pages (Template B)
- `slug`: URL-friendly path (e.g., fontfusion-vs-fontpair)
- `entity_a`: Primary entity name
- `entity_b`: Competitor entity name
- `use_case`: Main scenario (e.g., SaaS Branding)
- `verdict`: 1-sentence AI summary
- `features`: JSON or pipe-separated list of features to compare
- `entity_a_pros`: Bullet points
- `entity_a_cons`: Bullet points
- `entity_b_pros`: Bullet points
- `entity_b_cons`: Bullet points
- `winner_category`: Who wins in which category
- `internal_links`: Pipe-separated URLs

## 2. Mood/Collection Pages (Template E)
- `slug`: (e.g., elegant-wedding-font-pairings)
- `mood`: (e.g., Elegant)
- `industry`: (e.g., Wedding)
- `intro`: Intro paragraph
- `pairing_1_name`: (e.g., Playfair + Lato)
- `pairing_1_font_a`: (e.g., Playfair Display)
- `pairing_1_font_b`: (e.g., Lato)
- `pairing_1_why`: Explanation
- `pairing_1_css`: CSS snippet
- `[...repeat for pairings 2-5]`
- `best_for`: Target use case for the table

## 3. Micro-Answer Pages (Template C)
- `slug`: (e.g., what-is-kerning)
- `term`: (e.g., Kerning)
- `definition`: 40-60 word AI Snapshot
- `how_it_works`: Explanation text
- `example`: Real-world industry example
- `importance`: Why it matters
- `related_term`: For comparison table
- `principles`: Bullet points for AEO box

## 4. Industry/Project-Specific Guide (Template F)
- `slug`: (e.g., best-fonts-for-saas)
- `industry`: (e.g., SaaS)
- `why_it_matters`: Intro text
- `top_pairings`: Pipe-separated list or separate columns
- `implementation_steps`: Numbered list
- `reference_table_data`: JSON for the AEO table
