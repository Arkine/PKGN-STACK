import passport from 'koa-passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

const User = mongoose.model('User');

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

// Strategy used when a user logs in
passport.use('local-login', new LocalStrategy(options, async (email, password, done) => {
	try {
		const user = await User.findOne({ email });
		
		if (!user) {
			return done('Incorrect username or password', false);
		}
		
		if (password !== user.password) {
			return done('Incorrect username or password');
		}

		const payload = {
			sub: user._id,
			exp: Math.floor(Date.now() * 1000) * (60 * 60) // 1 hr
		};
		
		const token = jwt.sign(payload, process.env.SECRET);
		const data  = {
			user
		};

		return done(null, user, payload, data);
	} catch(error) {
		return done(error);
	}
}));

passport.use('local-signup', new LocalStrategy(options, async (email, password, done) => {
	try {
		const user = new User({
			email,
			password
		});

		await new user.save();

		return done(null, user);
	} catch(error) {
		return done(error);
	}
}));
