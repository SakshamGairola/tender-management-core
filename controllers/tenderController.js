import Tender from '../models/Tender.js';

export function createTender(req, res) {
	const newTender = new Tender(req.body);
	newTender.save().then((tender) => res.json(tender));
}

export function getTenders(req, res) {
	Tender.find().then((tenders) => res.json(tenders));
}

export function getAvailableTenders(req, res) {
	Tender.find({ endTime: { $gte: new Date() } }).then((tenders) => res.json(tenders));
}
