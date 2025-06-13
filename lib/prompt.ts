import { readFileSync } from 'fs';
import { join } from 'path';

const text = readFileSync(join(process.cwd(), '/lib/prompt.txt'), 'utf-8');

export default text;
