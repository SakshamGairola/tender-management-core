import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
	res.send('Hello world');
});

server.listen(PORT, () => {
	console.log(`listening on :${PORT}`);
});
