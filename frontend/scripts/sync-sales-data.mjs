import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../../backend/data/sales_data.json', import.meta.url));
const destDir = fileURLToPath(new URL('../src/data-source', import.meta.url));
const dest = `${destDir}/sales_data.json`;

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);

console.log(`[sync-sales-data] copied backend/data/sales_data.json -> src/data-source/sales_data.json`);
