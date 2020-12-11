const request = require('request')

var geoloc=function(townvalue,callbackfunc){

var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + townvalue + '.json?limit=2&access_token=pk.eyJ1IjoiZ2F5YXRyaTU5OCIsImEiOiJja2I0b3VoNnIwaHhoMnJvN3JzcXJzNDZ2In0.CW0DUM6_vuac_HMrXj7cnQ'

request({url:url,json:true},function(error,response){
        if(error)
                return callbackfunc(error,null);
        else if(response.body.features.length==0)
                return callbackfunc("Error:Invalid Location",null);
        else {
                var latlong = {
                        longitude:response.body.features[0].center[0],
                        latitude:response.body.features[0].center[1],
                }
                return callbackfunc(null,latlong)
        }
})
 }
 module.exports.geoloc=geoloc
