'use strict';

import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	appClient: resolveApp('../client'),
	appIndexJs: resolveApp('../client/index.js'),
	appOutput: resolveApp('../client/public'),
	appHtml: resolveApp('../client/public/index.html'),
	serverStart: resolveApp('src/app.js'),
	appSrc: resolveApp('src'),
};