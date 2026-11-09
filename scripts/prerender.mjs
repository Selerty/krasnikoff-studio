import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, ws: false },
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));
  const indexPath = resolve('dist/index.html');
  const html = await readFile(indexPath, 'utf8');
  const root = '<div id="root"></div>';

  if (!html.includes(root)) {
    throw new Error('Could not find the empty app root in dist/index.html');
  }

  await writeFile(indexPath, html.replace(root, `<div id="root">${markup}</div>`));
  process.stdout.write(`Pre-rendered ${markup.length.toLocaleString()} characters into dist/index.html\n`);
} finally {
  await vite.close();
}
