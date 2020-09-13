
class Renderer{
    
    renderData(cities){ //receives an array of cities objects
        $('#cities-container').empty()
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({cities})
        console.log(`Renderer is rendering data`)
        console.log(cities)
        $('#cities-container').append(newHTML)
    }
}

const renderer = new Renderer()
// module.exports = renderer