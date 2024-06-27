import { Schema, model } from 'mongoose';

const BidSchema = new Schema({
	tenderId: { type: Schema.Types.ObjectId, ref: 'Tender', required: true },
	companyName: { type: String, required: true },
	bidTime: { type: Date, required: true },
	bidCost: { type: Number, required: true },
	isLate: { type: Boolean, required: true },
});

export default model('Bid', BidSchema);
