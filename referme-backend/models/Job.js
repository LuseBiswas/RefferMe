// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  requirements: {
    type: [String],  // Array of strings for requirements
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  applications: [
    {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      linkedinID: { type: String, required: true },
      resumeURL: { type: String, required: true }
    }
  ]
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
