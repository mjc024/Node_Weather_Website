const request=require('request')

const forecast=(lat,lon,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=49b666301c85f761edc5376aaff06cf7&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon) 
    request({url,json:true}, (error,{body})=>{
            // const data =JSON.parse(response.body)
            // console.log(response.body.location.lat)
            if(error){
                callback("Can't connect to internet")
            
            }
            else if(body.error){
                console.log("Cant find location ")
            }
            else{
            //  let precip=response.body.current.precip
            //  let rain=response.body.current.temperature
            //  console.log(response.body.current.weather_descriptions[0]+ " TEMP: "+rain+" Precip Chance: "+precip)
             callback(undefined,
                body.current.weather_descriptions[0]+", It is "+body.current.temperature+" degree. Chances of rain are "+body.current.precip+".",
                // temperature:body.current.temperature,
                // probRain:body.current.precip
             )    
        }
})
}
module.exports=forecast