const { TRACKS, DURATIONS } = require('../constants/tracks');

async function getTracks(req, res) {
  res.json({ tracks: TRACKS, durations: DURATIONS });
}

module.exports = { getTracks };
