var express = require('express');
var router = express.Router();
var weatherinfo = require('../utils/weatherinfo.js');
var path = require('path');
var geoloc = require('../utils/geoloc.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public','Firstpage.html'))
});

router.get('/getweather',function(req,res,next){
  res.sendFile(path.join(__dirname,'../public','weatherAppForm.html'))
});
router.get('/gettemperature',function(req,res,next){
  res.sendFile(path.join(__dirname,'../public','temperatureAppForm.html'))
});

router.post('/showweatherstatus',function(req,res,next){

  var latitude=req.body.latitude
  var longitude=req.body.longitude
  var geoloc={latitude:latitude, longitude:longitude}

  weatherinfo.getWeatherInfo(geoloc,function(error,data){
    if(error){
      console.log(error)
    }
    else {
      var temperature=data
      geoloc.temperature = data
      res.render('weatherstatus',geoloc)
    }
  })
});

router.post('/showgeoloc',function(req,res,next){
  var city = req.body.city;
  geoloc.geoloc(city,function(error,locjson){
    if(error){
        console.log(error)
    }
    else{
        weatherinfo.getWeatherInfo(locjson,function(error,temperatureinfo){
            if(error){
                console.log(error)
            }
            else{
                res.render('citytemperature',{temperature:temperatureinfo})
            }
        
        })
    }
})
})


module.exports = router;
