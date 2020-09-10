// const api = require('../server/routes/api')
// const $ = require('jquery')
// const { builtinModules } = require('module')
// const { waitForDebugger } = require('inspector')

class TempManager{
    constructor(){
        this.cityData=[]
    }

    // Internal Methods:
    // addCityToDB(city){
    //     $.post('/city',c,function(response){
    //         console.log(response)
    //     })
    // }


    // External Methods
    async getDataFromDB(){
      const cities = await $.get('/cities')
      cities.forEach(c=>{
          console.log("cities from DB",c)
          this.cityData.push(c)})
           
    }

    async getCityData(cityName){  
           await $.get(`/city/${cityName}`,(city=>{
            this.cityData.push(city)  //saving to cityData array, so it can be rendered
            console.log(`Model.getCityData - saved new city, ${cityName}`)
        }))
    }

    saveCity(cityName){
        const city = this.cityData.find(c=>c.name==cityName)
        this.cityData.push(city)
        console.log(`Model-saveCity cityName: ${cityName}`)
        console.log("model city",city)
        $.post(`/city/${cityName}`,city,function(res){
            console.log(`Model-saveCity res: ${res}`)
        })
    }

    removeCity(cityName){
        const city = this.cityData.find(c=>c.name=== cityName)
        const i = this.cityData.findIndex(city)

        $.ajax({
            method:"DELETE",
            url:`/city/${cityName}`,
            success:()=>{
                this.cityDaya.splice(i,1)
                console.log(`Model-removeCity res: ${res}`)
            },
            error:(xhr,text,err)=>{
                console.log(err)
            }
        })
        // $.remove(`/city/${cityName}`,city,function(res){
        //     const i = cityData.findIndex(city)
        //     cityDaya.splice(i,1)
        //     console.log(`Model-removeCity res: ${res}`)
        // })
    }

}

const tempManager = new TempManager()
// module.exports = tempManager