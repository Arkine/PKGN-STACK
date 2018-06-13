import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export default (ctx, next) => {
	// Check for the presence of the auth header
	if (!ctx.req.headers.authorization) {
		return next('No Auth header present');
	}
	// Extract the token
	const token = ctx.req.headers.authorization.split(' ')[1];
	
	// Verify that the token was signed by this domain
	return jwt.verify(token, process.env.SECRET, async (err, payload) => {
		if (err) {
			return next(err);
		}
		const userId = payload.sub;
		
		// Attach the user to the request body
		try {
			const newUser = await User.findById(userId);

			ctx.req.user = newUser;

			return next();
		} catch(error) {
			return next(error);
		}
	});
}