    post.save((err,result)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        res.status(200).json({
            post:result
        });
    });