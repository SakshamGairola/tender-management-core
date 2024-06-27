import User from '../models/User.js';
// import compare, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compare, hash } from 'bcrypt';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '4CD95BFA72453EF282AC2397A2D33';

export async function register(req, res) {
	const { username, password, role } = req.body;

	const user = await User.findOne({ username });

	if (user) {
		return res.json({ status: 409, message: 'Username already exists' });
	}

	const hashedPassword = await hash(password, 10);
	const newUser = new User({ username, password: hashedPassword, role });
	newUser
		.save()
		.then((user) => res.json(user))
		.catch((err) => res.json(err));
}

export async function login(req, res) {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user || !(await compare(password, user.password))) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}
	const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '12h' });
	res.json({ token, role: user.role });
}
