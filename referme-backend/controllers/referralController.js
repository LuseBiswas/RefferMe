// controllers/referralController.js
import Referral from '../models/Referral.js';

// Create a new referral request
export const createReferral = async (req, res) => {
  try {
    const referral = new Referral({ ...req.body, referredBy: req.user._id });
    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({ message: 'Error creating referral request', error });
  }
};

// Get all referrals for a user
export const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({ referredTo: req.user._id }).populate('job').populate('referredBy', 'name email');
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referrals', error });
  }
};

// Update referral status
export const updateReferralStatus = async (req, res) => {
  try {
    const referral = await Referral.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!referral) return res.status(404).json({ message: 'Referral not found' });
    res.status(200).json(referral);
  } catch (error) {
    res.status(500).json({ message: 'Error updating referral status', error });
  }
};
