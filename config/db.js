const mongoose = require('mongoose');


const ConnectDb= async ()=>{
    try {
    ;
        const con  = await mongoose.connect(process.env.MONGO_URI,{
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
