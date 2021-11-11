const multer = require("multer");
const excelFilter = (req,file,cb)=>{
    if(file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")){
        cb(null,true);
    }else{
        cb("please ony upload excel file",false);
    }
}
const storages =multer.diskStorage({
 destination :(req,file,cb)=>{
    cb(null, __basedir +"/resource/")
},
 filename : (req,file,cb)=>{
    cb(null, $`${Date.now()}-file-${file.originalname}`)
 }
})


var uploadfile = multer({ storage: storages,  fileFilter: excelFilter});
module.exports = uploadfile;