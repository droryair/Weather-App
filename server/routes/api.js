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
            const name = response.data.name
            const temp = response.data.main.temp
            const neededData={name,temp}
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

router.post('/city/:cityName',function(req,res){
    const city =req.body 
    const name = city.name
    const temp = city.temp
    const condition = city.condition
    const conditionPic = city.conditionPic
    const c = new City({
        name,
        temp,
        condition,
        conditionPic
    })
    // res.send(c)
    c.save()
    .then(res.send(`${name} has been saved to the DB`))
})

router.delete('/city/:cityName',function(req,res){
    const cityName = req.params.cityName
    City.deleteOne({name:cityName})
    .then(res.send(`${cityName} has been removed form the DB`))
})


module.exports = router