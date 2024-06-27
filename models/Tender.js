import { Schema, model } from 'mongoose';

const TenderSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	bufferTime: { type: Number, required: true },
});
export default model('Tender', TenderSchema);
