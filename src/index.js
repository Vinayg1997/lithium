const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongodb+srv://Vinay1997:Z4AKcP40EXSsGdcj@vinay.0stv4ut.mongodb.net/
mongoose.connect("mongodb+srv://Vinay1997:Z4AKcP40EXSsGdcj@vinay.0stv4ut.mongodb.net/vinay-DB?retryWrites=true&w=majority"
, {
   useNewUrlParser: true 
}
).then( () => {console.log( "MongoDb is connected")}  )
.catch( err => console.log(err))




app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

