// const api = require('../server/routes/api')
// const $ = require('jquery')
// const { builtinModules } = require('module')
// const { waitForDebugger } = require('inspector')

class TempManager{
    constructor(){
        this.cityData=[]
    }

    async getDataFromDB(){
      const cities = await $.get('/cities')
      cities.forEach(c=>{

          this.cityData.push(c)})
           
    }

    async getCityData(cityName){  
           await $.get(`/city/${cityName}`,(city=>{
            this.cityData.push(city)  //saving to cityData array, so it can be rendered
            console.log(`Model.getCityData - saved new city, ${cityName}`)
        }))
    }

    saveCity(cityName) {
        const city = this.cityData.find(c => c.name == cityName)
        $.post(`/city/${cityName}`,city, function (res) {
        })
    }

    removeCity(cityName){
        const cityArray = this.cityData
        const city = cityArray.find(c=>c.name=== cityName)
        $.ajax({
            type:"DELETE",
            url:`/city/${cityName}`,
            success:(res)=>{
                const i = cityArray.indexOf(city)
                cityArray.splice(i,1)
                console.log(`Model-removeCity res: ${res}`)
            },
            error:(xhr,text,err)=>{
                alert(err)
            }
        })
    }
}

const tempManager = new TempManager()
