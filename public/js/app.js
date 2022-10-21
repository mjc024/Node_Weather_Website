console.log("Client Side Loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#msg-1')
const messageTwo= document.querySelector('#msg-2')


const fetchWeather =(location)=>{ 
    fetch('/weather?address='+location
    ).then((response)=> {
            response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                console.log(data.error)
            }
            else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecastData
                console.log(data.location)
                console.log(data.forecastData)
            }
                
            })   
    })  
}  

messageOne.textContent=''
messageTwo.textContent=''

weatherForm.addEventListener('submit',(event)=>{
    //It will prevent browser from resfreshing allowing us to access data
    event.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading'
    messageTwo.textContent=''
    fetchWeather(location)
})