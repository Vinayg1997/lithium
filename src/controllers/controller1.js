const UserModel1 = require("../models/userModel1")

const getBooks = async function (req , res) {
    let vin = req.body
    let vinay = await UserModel1.create(vin)
    res.send ({msg:vinay})
}

const booksData = async function (req , res){
    let gaw = await UserModel1.find()
    res.send({msg: gaw})

}
module.exports.getBooks= getBooks
module.exports.booksData=booksData