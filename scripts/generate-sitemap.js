import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://utaptech.co.za';
const contentDir = path.join(process.cwd(), 'src/content/blog');
const publicDir = path.join(process.cwd(), 'dist');

// Static routes
const staticRoutes = [
  '/',
  '/students',
  '/vendors',
  '/universities',
  '/about',
  '/pricing',
  '/help',
  '/contact',
  '/press',
  '/legal/terms',
  '/legal/privacy',
  '/legal/refunds',
  '/blog',
];

async function generateSitemap() {
  const links = [...staticRoutes];

  // Dynamically add blog routes
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        links.push(`/blog/${slug}`);
      }
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${links
  .map(
    (link) => `  <url>
    <loc>${SITE_URL}${link}</loc>
    <changefreq>${link === '/' || link === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${link === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap.xml with ${links.length} URLs`);
}

generateSitemap();
