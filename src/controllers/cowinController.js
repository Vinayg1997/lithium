let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getCentres = async function (req , res){
    try{
        let district_id = req.query.district_id
        let date = req.query.date
        let options ={
            method : 'get',
            url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const getCityWeather = async function (req, res) {
    try{
        let q=req.query.q
       let appid = req.query.appid
                    
    console.log(`query params are:${q} ${appid}`)
    let options={
        method:'get',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
    }
    let result=await axios(options)
    console.log(result.data)
    let data=result.data     
    res.status(200).send({msg:result.data})
}catch(error){
    res.status(500).send({msg:error})
}
}

const sortbytemp = async (req, res) => {
    try {
        const {apikey} = req.query;
        const cities = ["bengaluru","mumbai", "delhi", "kolkata", "chennai", "london", "moscow"];
        const temp = [];
        for (let i = 0; i < cities.length; i++) {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${apikey}`);
            temp.push({city: cities[i], temp: response.data.main.temp});

        }
        temp.sort((a, b) => a.temp - b.temp);  
        res.status(200).json(temp);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getmeme = async (req, res) => {
    try {
        const {template_id} = req.query;
        const {text0} = req.query;
        const {text1} = req.query;
        const {username} = req.query;
        const {password} = req.query;

        const response = await axios.post(`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getCentres = getCentres
module.exports.getCityWeather = getCityWeather 
module.exports.sortbytemp = sortbytemp
module.exports.getmeme = getmeme