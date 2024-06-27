import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}
	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Invalid token' });
		}
		req.user = decoded;
		next();
	});
};

const authorize = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	next();
};

export { authenticate, authorize };
