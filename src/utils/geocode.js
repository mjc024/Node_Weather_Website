const request=require('request')

const geocode=(address,callback)=>{
    const url ='https://api.tomtom.com/search/2/geocode/'+ encodeURIComponent(address)+'.json?key=9y3KeR3AJm61uAWEu2s4FITigAJCyHJb'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Can't connect to Internett",undefined)    
        }
       else if(body.results.length==0){
            callback("Try another search Can't find",undefined)

        }
        else{
                callback(undefined,{
                longitude:body.results[0].position.lon,
                latitude:body.results[0].position.lat,
                location:body.results[0].address.country,
                municipality:body.results[0].address.municipality
            })
            }
    })
    

}
module.exports=geocode