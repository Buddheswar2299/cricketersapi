const Player = require('../model/playerModel')

const getPlayers = async(req,res)=>{
    try{
        const data = await Player.find()
        res.status(200).send({playerData:data})
    }catch(err){
        // console.log(err)
        res.status(500).send({sucess:false,message:'INTERNAL SERVER ERROR'})
    }
}

const addPlayers = async(req,res)=>{
    try{
        const{first_name,last_name,email,phone,role,available} = req.body

        await Player({
            first_name,
            last_name,
            email,
            phone,
            role,
            available
        }).save()

        res.status(200).send({

            message:"Data added sucessfully"
        })
    }catch(err){
        res.status(500).send({
            sucess:false,
            message:'INTERNAL SERVER ERROR'
        })
    }
}


const updatePlayers = async(req,res)=>{
    try{
        const player_id = req.params.id
        await Player.updateOne({_id:player_id},{$set:req.body})
        res.status(200).send({
            sucess:true,
            message:"player details has been updated"
        })
    }catch(err){
        res.status(500).send({
            sucess:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
    }

const deletePlayer = async(req,res)=>{
    try{
        const player_id = req.params.id
        await Player.deleteOne({_id:player_id})
        res.status(200).send({
            sucess:true,
            message:"A user id has been deleted"
        })
    }catch(err){
        res.status(500).send({
            sucess: false,
            message:'INTERNAL SERVER ERROR'
        })
    }
}

module.exports = {getPlayers,addPlayers,updatePlayers,deletePlayer}

