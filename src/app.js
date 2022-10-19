const path =require('path')
const express= require('express')
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicDirectory=path.join(__dirname,'../public')

const app=express()
app.set('view engine','hbs')
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name1: 'mjc'
    })
})

app.get('/about',(req,res)=>{
     res.render('about',{
        title:"About me ",
        name1: "mjc"
     })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: "This page is to help you"
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
app.get('/weather',(req,res)=>{
    res.send({
        location:'Pakistan',
        forecast: 'Sunny'
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+port)
})