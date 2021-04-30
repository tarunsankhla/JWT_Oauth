const mongoose = require('mongoose');


const ConnectDb= async ()=>{
    try {
    
        const con  = await mongoose.connect('mongodb+srv://Tether:tarun123@clustertether.pdixo.mongodb.net/storytask?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        
    } catch (error) {
 
        console.log(error);
        process.exit(1)   
    }
}

module.exports = ConnectDb;
