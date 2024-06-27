// bidController.js
import { ObjectId } from 'mongodb';
import Bid from '../models/Bid.js';
import Tender from '../models/Tender.js';

export const createBid = async (req, res) => {
	const { tenderId, companyName, bidCost } = req.body;
	const tender = await Tender.findById(tenderId);
	const isLate = new Date() > tender.endTime;
	const newBid = new Bid({ tenderId, companyName, bidCost, bidTime: new Date(), isLate });
	newBid.save().then((bid) => {
		req.io.emit('tenderUpdate', { tenderId: bid.tenderId });
		res.json(bid);
	});
};

export const getBids = (req, res) => {
	const { tenderId } = req.body;
	Bid.find({ tenderId: new ObjectId(tenderId) })
		.sort({ bidCost: 1 })
		.then((bids) => res.json(bids));
};
