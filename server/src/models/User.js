import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import passportLocalMongoose from 'passport-local-mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import validator from 'validator';
import crypto from 'crypto';


const UserSchema = new Schema({
	username: String,
	refreshToken: String,
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			isAsync: true,
			validator: (email, cb) =>
				cb(validator.isEmail(email), `${email} is not a valid email address`)
		},
		required: 'Please Supply an email address'
	}
});

// Adds our methods for validation to simplify it
UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	errorMessages: {
		UserExistsError: 'That Email Already Exists' // Error returned if email is already registered
	}
});

UserSchema.statics.generateToken = function() {
	return crypto.randomBytes(20).toString('hex');
};


UserSchema.pre('save', function encryptPassword(next) {
	const user = this;
	// proceed further only if the password is modified or the user is new
	if (!user.isModified('password')) return next();
	// generate salt
	return bcrypt.genSalt((saltError, salt) => {
		if (saltError) return next(saltError);

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if (hashError) return next(hashError);
			user.password = hash; // replace a password string with hash value
			return next();
		});
	});
});


// Converts MongoDB error messages to prevent revealing sensitive data
UserSchema.plugin(mongodbErrorHandler);

export default mongoose.model('User', UserSchema);