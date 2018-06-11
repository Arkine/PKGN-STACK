import passport from 'koa-passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

const User = mongoose.model('User');

const options = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
};

passport.use('local', new LocalStrategy(options, async (email, password, done) => {
	console.log('trying stuff');
	try {
		const user = await User.findOne({ email });
		console.log('User:', user);
		
		if (!user) {
			return done(null, false);
		}
		
		if (password === user.password) {
			return(null, user);
		}

		return done(null, false);
	} catch(error) {
		return done(error);
	}
}));

// passport.use('jwt', new JWTStrategy({
// 	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: process.env.SECRET
// }, (jwtPayload, cb) => {
// 	//Get user here if needed JWT should have user data
// 	console.log('got to JWT strat');
// }))

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id)

		return done(null, user);
	} catch (error) {
		return done(error);
	}
});
