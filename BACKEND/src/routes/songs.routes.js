

const express = require('express')
const multer = require('multer')
const UploadFile = require('../service/storage.service')
const router = express.Router()
const songModel = require('../models/song.model')

const upload = multer({storage:multer.memoryStorage()})

// multer ka use karna padega




// song upload

router.post('/songs',upload.single("song"),async(req,res)=>{
console.log(req.body)
console.log(req.file)
const FileData = await UploadFile(req.file)
console.log(FileData)

const song = await songModel.create({
title : req.body.title,
artist : req.body.artist,
audio : FileData.url,
mood : req.body.mood
})

res.status(201).json({
message : "song created sucessfully",
song : song
})
}) 


router.get('/songs', async (req, res) => {
  const { mood } = req.query;

  try {
    // Case-insensitive match for mood
    const songs = await songModel.find({
      mood: { $regex: new RegExp(`^${mood.trim()}$`, 'i') }
    });

    res.json({ message: "Songs fetched Sucessfullly", songs });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: "Error fetching songs" });
  }

res.status(200).json({
message : "Songs fetched Sucessfullly",
songs : songs
})
})



router.delete("/songs/:id", async (req, res) => {
  try {
    const song = await songModel.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
});


module.exports = router






