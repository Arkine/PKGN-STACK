import mongoose, { Schema } from 'mongoose';
import passport from 'koa-passport';
import passportLocalMongoose from 'passport-local-mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const UserSchema = new Schema({
	username: String,
	email: String
});

// Adds our methods for validation to simplify it
UserSchema.plugin(passportLocalMongoose, {
	usenameField: 'email',
	errorMessages: {
		userExistsError: 'Email Already Exists'
	}
});

// Converts MongoDB error messages to prevent revealing sensitive data  
UserSchema.plugin(mongodbErrorHandler);

export default mongoose.model('User', UserSchema);