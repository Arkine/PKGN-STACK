'use strict';

import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
	appIndexJs: resolveApp('src/index.js'),
	appOutput: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appSrc: resolveApp('src')
};