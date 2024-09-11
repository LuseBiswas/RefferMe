// models/Referral.js
import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  feedback: String,
}, { timestamps: true });

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;
