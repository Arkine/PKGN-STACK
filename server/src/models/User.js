import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	username: String,
	email: String
});

export default mongoose.model('User', UserSchema);