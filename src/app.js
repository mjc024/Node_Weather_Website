const path =require('path')
const express= require('express')
const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app=express()

///DEFINE PATGS FOR EXPRESS CONFIG
const publicDirectory=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)

//SETUP HANDLEBARS AND VIEWS LOCATION
app.set('view engine','hbs')    
app.set('views',viewsPath)

//SETUP STATIC DIRECTORY TO SERVE   
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name1: 'mjc'
    })
})

app.get('/about',(req,res)=>{
     res.render('about',{
        title:"About me",
        name1: "mjc"
     })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: "This page is to help you",
        title: "Help",
        name1: "mjc"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "should provide a search"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{     
        if(error){
         return  res.send({error:error})
        } 
         forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                 res.send({Error:error})
                }
                else{
                res.send({
                    forecastData,
                    location,
                    address:req.query.address})
                }
         })
     })
     
    
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
      return res.send({
        error:"You must provide a search"
      })
    }
    res.send(
        {
            products: [ ]
        }
    )
})



//Express provides wild card character when something won't match this will run
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg:"Help Article Not found",
        name1: "mjc"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg: "Page Not found",
        name1: "mjc",
        title: "404"
    })
     
})
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1> <body><p>hellow stiup sdnjn</p></body>'+{
//         name1:'andrew',
//         age:23
//     })
// })

    // app.get('/help',(req,res)=>{
    //     res.send({
    //         name1:'andrew',
    //         age:23
    //     })
    // })

    // app.get('/about',(req,res)=>{
    //     res.send('<h1>About page</h1>')
    // })


app.listen(port,()=>{
    console.log("Server is up on port "+port)
})