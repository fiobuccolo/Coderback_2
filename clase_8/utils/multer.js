import multer from "multer";

const storage = multer.diskStorage({
    //destination: carpeta donde se va a guardar el archivo
    destination:function(req,file,cb){
        console.log(file);
        cb(null,'./public')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const loader = multer({storage})


 