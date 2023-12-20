function validatePost(req,res,next){
    // validación de datos necesarios
    const {userId,id,title,body } = req.body
    if(!userId){
        return res.json({
            error:"User id is required"
        })
    }
    //---
    if(!id){
        return res.json({
            error:" id is required"
        })
    }
      //---
      if(!title){
        return res.json({
            error:"title is required"
        })
    }
      //---
      if(!body){
        return res.json({
            error:"body is required"
        })
    }
    next()
}

export default validatePost