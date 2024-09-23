const express = require('express')
const app = express()

//importing the cors
const cors = require('cors')
app.use(cors())

const connectdb = require('./config/db')
const Player = require('./model/playerModel')
app.use(express.json())
const useRouter = require('./routes/playerRoutes')
app.use('/users',useRouter)

app.listen(3000)
connectdb
console.log('server is listening on 3000') 

// password : QZynBDM6NLKggTfl
// uri : mongodb+srv://budeerokkam1199:QZynBDM6NLKggTfl@cluster1.i3bbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1