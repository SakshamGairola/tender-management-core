import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import tenderRoutes from './routes/tenderRoutes.js';
import bidRoutes from './routes/bidRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL =
	process.env.MONGO_URL ||
	'mongodb+srv://sakshamgairola28:saksham0607@tenderclusters.l0znrhx.mongodb.net/?retryWrites=true&w=majority&appName=tenderClusters';

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGO_URL);

app.use('/api/auth', authRoutes);
app.use('/api/tenders', tenderRoutes);
app.use(
	'/api/bids',
	(req, res, next) => {
		req.io = io;
		next();
	},
	bidRoutes
);
app.get('/helloWorld', (req, res) => {
	res.send('<h1><b>Hello world</b></h1>');
});

const expressServer = app.listen(PORT, () => {
	console.log(`listening on :${PORT}`);
});

const io = new Server(expressServer, {
	cors: {
		origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
		methods: ['GET', 'POST'],
	},
});
io.on('connection', (socket) => {
	socket.on('tenderCreated', () => {
		io.emit('updateTenders');
	});
	socket.on('newBidAdded', (data) => {
		io.emit('newBidAdded', data);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
