const UserModel1 = require("../models/userModel1")

const createUser1 = async function (req, res) {
    let data = req.body
    let savedData = await UserModel1.create(data)
    res.send({ msg: savedData })
}



module.exports.createUser1 = createUser1