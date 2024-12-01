const Song = require('../model/song')
const {success, error} = require('../utils/wrapper')

const createSong = async (req, res)=>{
  try {
    const song = req.body.song;
    const singer = req.body.singer;
    const desc = req.body.desc;
    const album = req.body.album;
    const duration = req.body.duration;

    if (!song || !singer || !desc || !album || !duration) {
      return res.send(error(403, "all fileds required"))
    }

    const alreadyExist = await Song.findOne({song})
    if (alreadyExist){
      return res.send(error(402, "Already Exists"));
    }

    await Song.create({song, singer, description:desc, duration, album})

    return res.send(success(200,"Successfully created","Successfully created"))
  } catch (err) {
    return res.send(error(500, err.message))
  }
}
const deleteSong = async (req,res)=>{
  try {
    const song = req.body.song;

    if (!song) {
      res.send(error(403, "all fileds required"))
    }
    const isExist = await Song.findOne({song})

    if (!isExist){
      res.send(error(402,"Song not exist"))
    }
    await Song.deleteOne({ song });

    return res.send(success(200,"Deleted","Deleted"))
  } catch (err) {
    
  }
}

const filterSongs = async (req, res) => {
  try {
    let { singer, song } = req.query;

    if (Array.isArray(singer)) {
      singer = singer[0];
    }
    if (Array.isArray(song)) {
      song = song[0]; 
    }
    const filter = {};
    if (singer) {
      filter.singer = { $regex: singer, $options: "i" }; // Case-insensitive regex for partial matches
    }
    if (song) {
      filter.song = { $regex: song, $options: "i" }; // Case-insensitive regex for partial matches
    }

    const songs = await Song.find(filter);

    if (songs.length === 0) {
      return res.send(error(404,"No songs found matching the criteria"))
    }

    return res.send(success(200,songs,"success"))
  } catch (err) {
    return res.send(error(500,err.message))
  }
};

const allSongs = async (req, res)=>{
  try {
    const songs = await Song.find()

    return res.send(success(200,songs,"success"))
  } catch (err) {
    return res.send(error(500,err.message))
  }
}

const incrementView = async (req, res) => {
  try {
    const { song } = req.body;

    if (!song) {
      return res.send(error(403,"Song name is required"))
    }

    const songRecord = await Song.findOne({ song });

    if (!songRecord) {
      return res.send(error(404,"Song not found"))
    }

    const updatedSong = await Song.findOneAndUpdate(
      { song },
      {
        $set: {
          allView: (parseInt(songRecord.allView) + 1).toString(),
          monthlyView: (parseInt(songRecord.monthlyView) + 1).toString(),

        },
      },
      { new: true }
    );

    return res.send(success(200,updatedSong,"View count updated successfully"))
  } catch (err) {
    return res.send(error(500,err.message))
  }
};
module.exports = {createSong, deleteSong, filterSongs, allSongs, incrementView}