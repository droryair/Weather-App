
const loadPage = async function(){
    await tempManager.getDataFromDB()
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
    $('#search-input').val("")
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

$('#cities-container').on('click', '.refresh-city', function () {
    const cityName = $(this).parent().siblings('.city-name').text()
    tempManager.updateCity(cityName).then(city => {
        renderer.renderData(tempManager.cityData)
    })

})

