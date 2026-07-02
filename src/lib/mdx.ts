import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const guidesDirectory = path.join(process.cwd(), 'src/content/guides');
const seoDirectory = path.join(process.cwd(), 'src/content/seo');
const blogDirectory = path.join(process.cwd(), 'src/content/blog');
const pairingsDirectory = path.join(process.cwd(), 'src/content/pairings');

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

export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(blogDirectory)) return [];
    const fileNames = fs.readdirSync(blogDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

export function getBlogMeta(slug: string): GuideMeta | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading blog meta for ${slug}:`, error);
    return null;
  }
}

export function getAllPairingSlugs(): string[] {
  try {
    if (!fs.existsSync(pairingsDirectory)) return [];
    const fileNames = fs.readdirSync(pairingsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Error reading pairings directory:", error);
    return [];
  }
}

export function getPairingMeta(slug: string): GuideMeta | null {
  try {
    const fullPath = path.join(pairingsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading pairing meta for ${slug}:`, error);
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

export function getAllSeoSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(seoDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Error reading seo directory:", error);
    return [];
  }
}

export function getSeoMeta(slug: string): GuideMeta | null {
  try {
    const fullPath = path.join(seoDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading seo meta for ${slug}:`, error);
    return null;
  }
}
