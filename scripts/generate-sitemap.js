import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'dist'); // assuming vite builds to dist
const srcDir = path.join(rootDir, 'src');

const BASE_URL = 'https://utaptech.co.za';

// Find blog posts (from src/content/blog or similar if exists)
// Or just hardcode the known routes for a simple marketing site
const routes = [
  '/',
  '/about',
  '/blog',
  '/students',
  '/universities',
  '/vendors',
  '/pricing',
  '/help',
  '/contact',
  '/press',
  '/faqs',
  '/refunds',
  '/terms',
  '/privacy',
  '/vs/eezipay',
  '/vs/mr-d',
  '/vs/varsity-vibe',
];

// Let's try to dynamically read from the blog if the folder exists
try {
  const postsDir = path.join(srcDir, 'pages', 'blog', 'posts'); // assuming some structure, adjust as needed
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);
    files.forEach(file => {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        routes.push(`/blog/${slug}`);
      }
    });
  }
} catch (e) {
  // Ignored
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

// Ensure dist directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully at dist/sitemap.xml');
