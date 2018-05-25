import dotEnv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

const [major] = process.versions.node.split('.').map(parseFloat);
if (major < 7) {
	console.log('You are using an older version of node. Please upgrade to Node version 7 or greater.')
	process.exit();
}

// Set our env variables
dotEnv.config({
	path: path.join(__dirname, './config/variables.env')
});

// Connect our DB
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
	console.log('There was a DB Err:', err);
});

// Import models here

const app = require('./src/app');
const server = app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${server.address().port}`);
});

