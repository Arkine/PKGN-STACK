'use strict';

import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	appIndexJs: resolveApp('client/index.js'),
	serverStart: resolveApp('src/app.js'),
	appSrc: resolveApp('server/src'),
};