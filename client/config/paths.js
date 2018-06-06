'use strict';

import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
console.log(appDirectory);
export default {
	appIndexJs: resolveApp('src/index.js'),
	appOutput: resolveApp('src/public'),
	appHtml: resolveApp('src/public/index.html'),
	appSrc: resolveApp('src'),
};