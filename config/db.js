const mongoose = require('mongoose');


const ConnectDb= async ()=>{
    try {
        console.log("URI : "+process.env.MONGO_URI+process.env.PORT );
        const con  = await mongoose.connect(`mongodb+srv://Tether:tarun123@clustertether.pdixo.mongodb.net/storytask?retryWrites=true&w=majority`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("URI : "+process.env.MONGO_URI+process.env.PORT );
        console.log(`MongoDb connection : ${con.connection.host}`)
    } catch (error) {
        console.log("where");
        console.log("opaka"+error);
        process.exit(1)   
    }
}

module.exports = ConnectDb;
