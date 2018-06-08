import jwt from 'jsonwebtoken';
import passport from 'koa-passport';

export default (ctx, next) => {

	return passport.authenticate('local', (err, user, info) => {
		console.log('here', user)
		if (err || !user) {
			return next(err, user);
		}

		ctx.req.login(user, err => {
			if (err) {
				return next(err);
			}
		});

		// Generate a signed token with the contents of the user object
		const token = jwt.sign(user, process.env.SECRET);
		return next(null, user);
	})(ctx, next);
}