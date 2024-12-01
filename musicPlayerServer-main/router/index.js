const {createSong,deleteSong, filterSongs, allSongs, incrementView} = require('../controllers')

const route = require("express").Router()

route.post('/',createSong)
route.delete('/',deleteSong)
route.get('/filter',filterSongs)
route.get('/all',allSongs)
route.put('/view',incrementView)

module.exports = route