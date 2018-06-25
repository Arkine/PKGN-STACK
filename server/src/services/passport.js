import passport from 'koa-passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
// import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

const User = mongoose.model('User');

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

passport.use('local-login', new LocalStrategy(options, async (email, password, done) => {
	console.log('trying stuff');
	try {
		const user = await User.findOne({ email });
		
		
		if (!user) {
			return done('Incorrect username or password', false);
		}
		
		if (password !== user.password) {
			return done('Incorrect username or password');
		}

		const token = jwt.sign({
				sub: user._id,
				iat: Math.floor(Date.now() / 1000), // Issued at time,
				exp: Math.floor(Date.now() / 1000) * (60 * 60) // expire in 1 hr
		}, process.env.SECRET);

		return done(null, user, token);
	} catch(error) {
		return done(error);
	}
}));

passport.use('local-register', new LocalStrategy(options, async (email, password, done) => {
	if (!email || !password) {
		return {
			error: {
				message: 'Please provide valid credentials'
			}
		}
	}

	try {
		const user = new User({
			email,
			password
		});

		const newUser = await new user.save();

		console.log('got bnew user', newUser);

		return done(null, newUser);
	} catch(error) {
		return done(error);
	}
}));
