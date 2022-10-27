const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel = require("../models/bookAuthor")
const bookAuthor = require("../models/bookAuthor")
//Author schema
const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

//bookschema
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const filterbydata = async function(req,res){
    let singleauthor = await bookAuthor.findOne({author_Name:"Chetan Bhagat"})
    let equal_id = singleauthor.author_id
    let allbooks = await BookModel.find({author_id:equal_id})

    res.send({data:allbooks})

}

const UpdateBooks = async function(req ,res){
    let updateBooks = await BookModel.findOneAndUpdate(
        { name : "Two states"},
        {$set :{price :500}},
        {new :true}
    )

    let authorName = await bookAuthor.findOne(
        {author_id:updateBooks.author_id})

    res.send(({data:updateBooks.price , result :authorName.author_name}))
}
const findbyprice = async function(req,res){
    const findData = await BookModel.find(
        {price : {$gte :50 ,
                    $lte :100}}).select({author_id:1 , author_name:1})
       const authorIdlist = findData.map(book => book.author_id)  
       
       const authorList= await authorModel.find({author_id:{$in : authorIdlist}})

       findData.forEach(book=>{
        const author = authorList.find(author => book.author_id===author.author_id)
       })

            
    
    // let Array = []

    // for(let j = 0 ; j<finddata.length ; j++){
    //     let id = finddata[j].author_id
    //     let authorName = await bookAuthor.findOne({author_id:id})
    //                             .select({author_Name : 1 ,author_id :1 , _id :0})

    //     Array.push(authorName)
    // }
    res.send({data : Array})

}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find( {authorName : "HO" } )
    console.log(allBooks)
    if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    else res.send({msg: "No books found" , condition: false})
}


const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks

//create author export
module.exports.createAuthor=createAuthor
module.exports.filterbydata=filterbydata
module.exports.UpdateBooks=UpdateBooks
module.exports.findbyprice=findbyprice
