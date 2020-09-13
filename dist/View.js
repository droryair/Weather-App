
class Renderer{
    
    renderData(cities){ 
        $('#cities-container').empty()
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({cities})
        $('#cities-container').append(newHTML)
    }
}

const renderer = new Renderer()
