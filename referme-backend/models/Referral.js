// models/Referral.js
import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  message: { type: String }
});

export default mongoose.model('Referral', referralSchema);
