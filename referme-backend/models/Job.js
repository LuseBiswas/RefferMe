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
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
