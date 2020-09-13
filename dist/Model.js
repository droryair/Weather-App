

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
                this.cityData.push(city) 
        }))
    }

   async saveCity(cityName) {
        const city = this.cityData.find(c => c.name == cityName)
        alert(await $.post(`/city/${cityName}`,city))
    }

    async removeCity(cityName) {
        const cityArray = this.cityData
        const city = cityArray.find(c => c.name === cityName)
        const res = await $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`
        })
        const i = cityArray.indexOf(city)
        cityArray.splice(i, 1)
    }

    async updateCity(cityName) {
        const cityArray = this.cityData
        const res = await $.ajax({
            type: "PUT",
            url: `/city/${cityName}`
        })
        cityArray.forEach(c => {
            if (c.name === res.name) {
                cityArray[res.name] = res
            }
        })
    }
}

const tempManager = new TempManager()
