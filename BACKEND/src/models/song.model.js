

const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    audio: { type: String, required: true },
    mood: { 
        type: String,
        enum: ['happy', 'sad', 'romantic', 'party', 'energetic', 'calm'], // only these are valid
        required: true
    }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
