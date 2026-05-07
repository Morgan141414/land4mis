import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const root = join(process.cwd(), 'dist');
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.json', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function resolvePath(url) {
  const pathname = new URL(url, 'http://127.0.0.1').pathname;
  const filePath = pathname === '/' || pathname.startsWith('/auth')
    ? join(root, 'index.html')
    : join(root, pathname);
  const safePath = normalize(filePath);
  if (!safePath.startsWith(root)) return join(root, 'index.html');
  return safePath;
}

const server = createServer(async (req, res) => {
  try {
    const filePath = resolvePath(req.url ?? '/');
    const body = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': mime.get(extname(filePath)) ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise((resolve) => server.listen(4174, '127.0.0.1', resolve));

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1200 },
    { name: 'mobile', width: 390, height: 1200 },
  ]) {
    const page = await browser.newPage({ viewport });
    const consoleIssues = [];
    page.on('console', (msg) => {
      if (['error', 'warning'].includes(msg.type())) consoleIssues.push(`${msg.type()}: ${msg.text()}`);
    });
    page.on('pageerror', (error) => consoleIssues.push(`pageerror: ${error.message}`));

    await page.goto('http://127.0.0.1:4174/auth', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2600);
    await page.locator('.diagnostic-row').nth(1).click();
    await page.locator('.lang-toggle').click();
    await page.locator('.lang-toggle').click();

    const audit = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      hasManifest: Boolean(document.querySelector('link[rel="manifest"]')),
      diagnosticScore: document.querySelector('.diagnostic-score strong')?.textContent,
      hasLeadForm: Boolean(document.querySelector('.demo-form[aria-describedby]')),
      visibleUndefined: /undefined|NaN/.test(document.body.innerText),
    }));

    results.push({ viewport: viewport.name, consoleIssues, audit });

    if (consoleIssues.length) throw new Error(`${viewport.name} console issues: ${consoleIssues.join('; ')}`);
    if (audit.scrollWidth !== audit.viewportWidth) throw new Error(`${viewport.name} horizontal overflow: ${audit.scrollWidth} > ${audit.viewportWidth}`);
    if (!audit.hasManifest || !audit.hasLeadForm || audit.visibleUndefined) throw new Error(`${viewport.name} production audit failed`);
  }
} finally {
  await browser.close();
  server.close();
}

console.log(JSON.stringify(results, null, 2));
