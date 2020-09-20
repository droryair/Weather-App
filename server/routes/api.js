const express = require('express')
const City = require('../model/City')
const axios = require('axios')
const { default: Axios } = require('axios')


const router = express.Router()




router.get('/city/:cityName',function(req,res){
        const city = req.params.cityName
        const TO_CELSIUS = 273.15
        const API_KEY = '89c2e47b9680ffe94aefd1a4e1d940a9'
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
        axios.get(weatherApi)
        .then(response=>{
            const data = response.data
            const name = data.name
            const temp = Math.floor(data.main.temp-TO_CELSIUS)
            const condition = data.weather[0].description
            const conditionPic = data.weather[0].icon
            const neededData={name,temp,condition,conditionPic}
            res.send(neededData)
        })
        .catch(err=>{
            res.send(err)
        })
})

router.get('/cities',function(req,res){
    City.find({},function(err,cities){
        res.send(cities)
    })
})

router.post('/city/:cityName', function (req, res) {
    const city = req.body
    const name = city.name
    City.exists({ name }, function (err, result) {
        if (result) {
            res.send("This city already exists")
        } else {
            const temp = city.temp
            const condition = city.condition
            const conditionPic = city.conditionPic
            const c = new City({
                name,
                temp,
                condition,
                conditionPic
            })
            c.save()
                .then(res.send(`${name} has been saved to the DB`))
        }
    })
})

router.delete('/city/:cityName',function(req,res){
    const cityName = req.params.cityName
    City.deleteOne({name:cityName})
    .then(res.send(`${cityName} has been removed form the DB`))
})


router.put('/city/:cityName',function(req,res){
    const cityName = req.params.cityName
    const API_KEY = '89c2e47b9680ffe94aefd1a4e1d940a9'
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
    axios.get(weatherApi).then(response=>{
        const cityData =response.data

        const name = cityData.name
        const temp = cityData.main.temp
        const condition = cityData.weather[0].description
        const conditionPic = cityData.weather[0].icon

        const updatedCity = {name,temp,condition,conditionPic}
        const filter = {name}

        City.findOneAndUpdate(filter,updatedCity)  
        res.send(updatedCity)
    })

  
})



module.exports = router