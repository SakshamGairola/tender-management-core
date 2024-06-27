import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default model('User', UserSchema);
