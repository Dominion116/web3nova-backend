const mongoose = require('mongoose');
const { TRACK_SLUGS, DURATION_VALUES } = require('../constants/tracks');
const STATUS = require('../constants/statuses');

const PersonalSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email:    { type: String, lowercase: true, trim: true },
  phone:    { type: String, trim: true },
  venue:    { type: String, enum: ['online', 'onsite'], default: 'online' },
  github:   { type: String, trim: true },
  country:  { type: String, trim: true },
  state:    { type: String, trim: true },
  city:     { type: String, trim: true },
  gender:   { type: String, enum: ['male', 'female'], default: 'male' }
}, { _id: false });

const FinalDetailsSchema = new mongoose.Schema({
  duration:    { type: String, enum: DURATION_VALUES },
  motivation:  { type: String, trim: true },
  walletAddress: { type: String, trim: true }
}, { _id: false });

const ApplicationSchema = new mongoose.Schema({
  track:        { type: String, enum: TRACK_SLUGS, required: true },
  personal:     { type: PersonalSchema, default: undefined },
  finalDetails: { type: FinalDetailsSchema, default: undefined },

  status:       { type: String, enum: Object.values(STATUS), required: true, default: STATUS.DRAFT_STEP1 },

  // Simple app-level token to resume the application without creating a full user
  clientToken:  { type: String, required: true, unique: true },

  // TTL for abandoned drafts. When complete, we set this to null.
  expiresAt:    { type: Date, default: null }
}, { timestamps: true });

// TTL index: if expiresAt is set to a specific date, this document will be removed after that date.
// Note: expireAfterSeconds: 0 means "expire exactly at expiresAt".
ApplicationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Application', ApplicationSchema);
