// const renderer = require('./View')
// const data = require('./Model')
// const { deflateRawSync } = require('zlib')

// renderer methods: renderData(cities)
//data methods:getDataFromDB(),  getCityData(cityName),  saveCity(cityName) , removeCity(cityName)

const loadPage = async function(){
    await tempManager.getDataFromDB()
    console.log("first log for data array",tempManager.cityData)
    renderer.renderData(tempManager.cityData)
}

loadPage()

const handleSearch = async function(cityName){
    await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}

$('#search-button').on('click',function(){
    const cityName = $('#search-input').val()
    handleSearch(cityName)
})



$('#cities-container').on('click','.save-city',function(){
    const cityName = $(this).siblings('.city-name').text()
    tempManager.saveCity(cityName)
    renderer.renderData(tempManager.cityData)
})

$('#cities-container').on('click','.remove-city', function(){
    const cityName = $(this).siblings('.city-name').text()
    tempManager.removeCity(cityName)
})