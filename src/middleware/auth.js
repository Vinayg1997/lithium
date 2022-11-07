const jwt = require("jsonwebtoken");
const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-auth-token"];
    if(!token) return res.send({status: false,msg:"token must be present"})
    let decodedToken = jwt.verify(token,"FunctionUp-lithiumit")
    if(!decodedToken){
      return res.send({status: false, msg: "token is invalid"})
   }
   req.loggedInUser = decodedToken.userId
    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let checkAuthorise = req.params.userId
    if(checkAuthorise !== req.loggedInUser){
     return res.send({status: false, msg: "ooooh... permission denied"})
    } 
    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise