const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})


// Example 1 for path params
router.get('/students/:studentName', function(req, res){
    // ':' denotes that the following part of route is a variable
    // The value of this variable is what we are sending in the request url after /students
    // This value is set in the form of an object inside req.params
    // The object contain key value pairs
    // key is the variable in the route
    // value is whatever dynamic value sent in the request url
    let myParams = req.params

    // params attribute is fixed in a request object
    // params contains the path parameters object
    console.log("The path params in the request are : ", myParams)
    res.send('The full name is ' + myParams.studentName )
})

// Example 2 for path params
router.get('/student-details/:name', function(req, res){
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Dummy response')
})

module.exports = router;

//Q1.
// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7]

router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of
   // numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let missingNumber = (arr.length+1)*(arr.length+2)/2
    for (let i = 0; i < arr.length; i++) {
         missingNumber = missingNumber - arr[i];
        
    }
    ///LOGIC WILL GO HERE
    res.send( { data: missingNumber } );
})    

//Q2.
// -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33,
//34, 35, 37, 38]: 36 is missing
// Your route code will look like this
router.get('/sol2',function(req,res){
    function Missingint(numbers){
        let N = numbers.length+1
            let first = numbers[0]
            let last = numbers[numbers.length-1]
            let sum = N*(first+last)
            sum = sum/2
            let output = 0
            for(let i=0; i<numbers.length; i++)
            {
                output = output+numbers[i]
            }
            let abc = sum - output
            res.send({abc})
    }
    
    Missingint([33,34,35,37,38,39])
})
///LOGIC WILL GO HERE



//Q3
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },
   ]
 


//The file inside routes would look like this
 

   router.post('/players', function (req, res) {
       const newPlayer = req.body
       const newPlayername = req.body.name
       console.log();

       if(newPlayername !== players.name){
        players.push(newPlayer)
       }
 
       //LOGIC WILL COME HERE
       res.send(  { data: players , status: true }  )
   })
  



