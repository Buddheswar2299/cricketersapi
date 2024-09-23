const mongoose = require('mongoose')
let uri = 'mongodb+srv://budeerokkam1199:ZzDngxfau2bHZ5kF@cluster1.i3bbo.mongodb.net/mydb'

// const connectdb = async ()=>{
//     try{
//         await mongoose.connect(uri)
//         console.log('database connected')
//     }catch(err){
//         console.log(err)
//     }
// }
mongoose.connect(uri,)

const connectdb = mongoose.connection

connectdb.once('open',()=>{
    console.log('database is connected')
})

connectdb.on('error',(error)=>{
    console.log(error)
})


module.exports = connectdb;