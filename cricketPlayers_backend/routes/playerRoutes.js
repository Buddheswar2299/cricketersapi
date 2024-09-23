const express = require('express')
const playerRouter = express.Router()

const {getPlayers,addPlayers,updatePlayers,deletePlayer} = require('../controllers/playerController')


playerRouter.get('/get-players',getPlayers)

playerRouter.post('/add-players',addPlayers)

playerRouter.put('/update-players/:id',updatePlayers)

playerRouter.delete('/delete-players/:id',deletePlayer)

playerRouter.get('/',(req,res)=>{
    res.json({message:"message user router"})
})


module.exports = playerRouter