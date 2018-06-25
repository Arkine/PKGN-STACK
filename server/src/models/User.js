import mongoose, { Schema } from 'mongoose';
import passport from 'koa-passport';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
	}
});

// Converts MongoDB error messages to prevent revealing sensitive data  
UserSchema.plugin(mongodbErrorHandler);

UserSchema.methods.comparePassword = function (password, callback) {
	bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function saveHook(next) {
	const user =this;
	if (!user.isModified('password')) {
		return next();
	}

	return bcrypt.genSalt((error, salt) => {
		if (error) {
			return next(error);
		}

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if (hashError) {
				return next(error);
			}

			user.password = hash;

			return next();
		});
	});
});

UserSchema.post('save', function(error, doc, next) {
	if (error.name === 'MongoError' && error.code === 11000) {
		next({
			message: 'Email has already been registered'
		});
	} else {
		next(error);
	}
})

export default mongoose.model('User', UserSchema);