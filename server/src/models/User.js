import mongoose, { Schema } from 'mongoose';
import passport from 'koa-passport';
import passportLocalMongoose from 'passport-local-mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import validator from 'validator';


const UserSchema = new Schema({
	username: String,
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
	},
});

// Adds our methods for validation to simplify it
UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	errorMessages: {
		userExistsError: 'Email Already Exists'
	}
});

// Converts MongoDB error messages to prevent revealing sensitive data  
UserSchema.plugin(mongodbErrorHandler);

export default mongoose.model('User', UserSchema);