const request = require('request')

var getWeatherInfo=function(location,callbackfunc){
    var geolocation=location.latitude+","+location.longitude
    const url='http://api.weatherstack.com/current?access_key=d95bb6e4da5a1cd93e8c0a60042f9153&query='+geolocation


    request({ url: url ,json:true}, function(error, response)  {
        const data = response.body
        callbackfunc(null,data.current.temperature)
    })
}
module.exports.getWeatherInfo=getWeatherInfo