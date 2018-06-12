import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export default (ctx, next) => {
	if (!ctx.req.headers.authorization) {
		return next('No Auth header present');
	}

	const token = ctx.req.headers.authorization.split(' ')[1];

	return jwt.verify(token, process.env.SECRET, async (err, payload) => {
		if (err) {
			return next(err);
		}

		console.log('made it here');

		const userId = payload.sub;
		try {
			const newUser = await User.findById(userId);

			ctx.req.user = newUser;

			return next();
		} catch(error) {
			return next(error);
		}
	});
}