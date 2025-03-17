const adminAuth = (req,res,next)=>{
    console.log("auth checked");
    const token="xyz"
    const isAuthorised = token==="xyz";
    if(!isAuthorised){
        res.status(401).send("unauthrised request")
    }
    else{
        next();
    }
};
const userAuth = (req,res,next)=>{
    console.log("auth checked");
    const token="xyz"
    const isAuthorised = token==="xyz";
    if(!isAuthorised){
        res.status(401).send("unauthrised request")
    }
    else{
        next();
    }
}
module.exports={
    adminAuth,
    userAuth,
};