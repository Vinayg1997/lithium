const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"];
        if (!token) return res.status(404).send(" token is required");

        let decodedToken = jwt.verify(token, "Gyanesh");
        if (!decodedToken) {
            return res.status(401).send({ msg: " Unauthorized Access" });
        }
        req.loggedIn = decodedToken.userId;
        next()
    } catch (err) {
        res.status(500).send({ msg: " Unauthorized Access" });
    }
};


const authorise = function (req, res, next) {
    try {
        let checkAuthorise = req.params.userId;
        if (checkAuthorise !== req.loggedIn) {
            return res.status(403).send({ msg: "Please Enter correct credentials" });
        }
        next()
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};



module.exports.authenticate = authenticate;
module.exports.authorise = authorise;