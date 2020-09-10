// const api = require('../server/routes/api')
// const $ = require('jquery')
// const { builtinModules } = require('module')
// const { waitForDebugger } = require('inspector')

class TempManager{
    constructor(){
        this.cityData=[]
    }

    // Internal Methods:
    addCityToDB(city){
        $.post('/city',c,function(response){
            console.log(response)
        })
    }


    // External Methods
    async getDataFromDB(){
      const cities = await $.get('/cities')
           this.cityData.push(cities)
    }

    async getCityData(cityName){ //* async-await 
           await $.get(`/city/${cityName}`,(city=>{
            this.cityData.push(city) //* save to local data?
            console.log(`Model.getCityData - saved new city, ${cityName}`)
        }))
    }

    saveCity(cityName){
        const city = tempManager.cityData.find(c=>c.name==cityName)
        console.log(`Model-saveCity cityName: ${cityName}`)
        console.log(city)
        $.post(`/city/${cityName}`,city,function(res){
            console.log(`Model-saveCity res: ${res}`)
        })
    }

    removeCity(cityName){
        const city = this.cityData.find(c=>c.name=== cityName)
        $.delete(`./city/${cityName}`,city,function(res){
            const i = cityData.findIndex(city)
            cityDaya.splice(i,1)
            console.log(`Model-removeCity res: ${res}`)
        })
    }

}

const tempManager = new TempManager()
// module.exports = tempManager