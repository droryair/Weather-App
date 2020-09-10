const express = require('express')
// const mongoose = require('mongoose')
const City = require('../model/City')
const axios = require('axios')
const { default: Axios } = require('axios')


const router = express.Router()




router.get('/city/:cityName',function(req,res){
        const city = req.params.cityName
        const apiKey = '89c2e47b9680ffe94aefd1a4e1d940a9'
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
        axios.get(weatherApi)
        .then(response=>{
            // console.log(response)
            res.send(response.data)
        })
        .catch(err=>{
            // console.log(err)
            res.send(err)
        })

})

router.get('/cities',function(req,res){
    City.find({},function(err,cities){
        res.send(cities)
    })
})

router.post('/city/:cityName',function(req,res){
    // const city = JSON.parse(JSON.stringify(req.body)) 
    const city = req.body // * city is not the same as being sent (from model.js->35)
    console.log("city",city)
    const name = city.name
    // const temp = city.main.temp
    // console.log("temp",city.main)
    // const condition = city.condition
    // const conditionPic = city.conditionPic
    // const c = new City({
    //     name,
    //     temp,
        // condition,
        // conditionPic
    // })
    res.end()
    // c.save()
    // .then(res.send(`${name} has been saved to the DB`))
})

router.delete('/city/:cityName',function(req,res){
    const cityName = req.params.cityName
    City.remove({name:cityName})
    .then(res.send(`${cityName} has been removed form the DB`))
})





module.exports = router