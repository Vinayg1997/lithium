const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const newBookModel= require("../models/newBook")
const newAuthorModel= require("../models/newAuthor")
const newPublisher = require("../models/newPublisher")

const createBook= async function (req, res) {
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}
//assignment 
const createNewBook= async function (req, res) {
    let newbook = req.body
    let newBookCreated = await newBookModel.create(newbook)
    res.send({data: newBookCreated})
}

const createNewAuthor= async function (req, res) {
    let newAuthor = req.body
    let newBookCreated = await newAuthorModel.create(newAuthor)
    res.send({data: newBookCreated})
}
const createPublisher= async function (req, res) {
    let publisher = req.body
    let newBookCreated = await newPublisher.create(publisher)
    res.send({data: newBookCreated})
}



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.createNewBook= createNewBook
module.exports.createNewAuthor=createNewAuthor
module.exports.createPublisher=createPublisher