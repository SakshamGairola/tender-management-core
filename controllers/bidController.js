// bidController.js
import { ObjectId } from 'mongodb';
import Bid from '../models/Bid.js';
import Tender from '../models/Tender.js';

export const createBid = async (req, res) => {
	try {
		const { tenderId, companyName, bidCost } = req.body;
		const tender = await Tender.findById(tenderId);

		if (!tender) {
			return res.status(404).json({ message: 'Tender not found' });
		}

		const currentTime = new Date();
		const endTime = new Date(tender.endTime);
		const timeDiff = endTime - currentTime;

		const isLate = timeDiff <= 5 * 60 * 1000;

		if (isLate && !tender.isExtended) {
			const bufferTime = tender.bufferTime || 0;
			tender.endTime = new Date(endTime.getTime() + bufferTime * 60 * 1000);
			tender.isExtended = true; // Mark the tender as extended
			await tender.save();
		}
		const newBid = new Bid({
			tenderId,
			companyName,
			bidCost,
			bidTime: currentTime,
			isLate,
		});
		newBid.save().then((bid) => {
			req.io.emit('tenderUpdate', { tenderId: bid.tenderId });
			res.json(bid);
		});
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error });
	}
};

export const getBids = (req, res) => {
	const { tenderId } = req.body;
	Bid.find({ tenderId: new ObjectId(tenderId) })
		.sort({ bidCost: 1 })
		.then((bids) => res.json(bids));
};
