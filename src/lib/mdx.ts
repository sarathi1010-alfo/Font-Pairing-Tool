import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const guidesDirectory = path.join(process.cwd(), 'src/content/guides');

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
}

export function getAllGuideSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(guidesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Error reading guides directory:", error);
    return [];
  }
}

export function getGuideMeta(slug: string): GuideMeta | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading guide meta for ${slug}:`, error);
    return null;
  }
}

export function getAllGuides(): GuideMeta[] {
  const slugs = getAllGuideSlugs();
  const guides = slugs
    .map((slug) => getGuideMeta(slug))
    .filter((guide): guide is GuideMeta => guide !== null);

  return guides;
}
