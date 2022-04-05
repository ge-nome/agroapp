
class WeatherPredictor{ 
  constructor( cropReq, weatherSpec){
      this.cReq = cropReq
      this.wSpec = weatherSpec
  
      console.log(this.cReq)
      this.rain = this.cReq.rain.split(" - ")
      this.temp = this.cReq.temp.split(" - ")
      this.wind = this.cReq.wind.split(" - ")
  }
      getComparison(rain, temp, wind){
          const rArray = [ ]
          if(this.wSpec.rain > this.rain[0] && this.wSpec.rain < this.rain[1]){
              rArray.push('true')
          }else{
              rArray.push('false')
          }
          if(this.wSpec.temp > this.temp[0] && this.wSpec.temp < this.temp[1]){
              rArray.push('true')
          }else{
              rArray.push('false')
          }
          if(this.wSpec.wind > this.wind[0] && this.wSpec.wind < this.wind[1]){
              rArray.push('true')
          }else{
              rArray.push('false')
          }
          return rArray
      }
      predict(Comparison){
          const comp = Comparison
          const sAdvised = [['true', 'true', 'true'],['true', 'true', 'false']]
          const advised = [['true', 'false', 'true'],['true', 'false', 'false'], ['false', 'true', 'true']]
          const nAdvised = [['false', 'false', 'true'],['false', 'true', 'false'], ['false', 'false', 'false']]
          switch(JSON.stringify(comp)){
              case JSON.stringify(sAdvised[0]):
                  return 'Strongly advised. The weather conditions are just right'
                  break
              case JSON.stringify(sAdvised[1]):
                  return 'Strongly advised. The weather conditions are just right'
                  break
              case JSON.stringify(advised[0]):
                  return 'Advised. But you  will need light irrigation from time to time'
                  break
              case JSON.stringify(advised[1]):
                  return 'Advised. But you  will need light irrigation'
                  break
              case JSON.stringify(advised[2]):
                  return 'Advised. But you will need to use irrigation more often'
                  break
              case JSON.stringify(nAdvised[0]):
                  return 'Not Advised. But if you must plant you  must irrigate very well'
                  break
              case JSON.stringify(nAdvised[1]):
                  return 'Not advised. But if you must plant you  must irrigate very well'
                  break
              case JSON.stringify(nAdvised[2]):
                  return 'Not advised. But if you must plant you  must irrigate very well'
                  break
              default:
                  return 'Nothing to advise. '
                  break
          }
      }
  }

const id = []
const showloader = () => {
  document.getElementById('loader').style.display = "grid"
}
const hideloader = () => {
  document.getElementById('loader').style.display = "none"
}
const hideBody = () => {
  document.getElementById('container').style.display = "none"
}
window.onload = ()=>{ const urlpar = window.location.href
    showloader()
    var url = new URL(urlpar);
    var d = url.searchParams.get("name")
    id.push(d)
    
}
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

if(!('geolocation' in navigator)){
  console.log('No geolocator')
}
else{
  console.log('Geolocation exists')
  navigator.geolocation.getCurrentPosition(function(position){
    const lat = position.coords.latitude
   const long = position.coords.longitude


    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=8790e3c643df9b279466a0e22ae87e63", requestOptions)
  .then(response => response.json())
  .then(function(data){
    console.log(data.main.temp)

    document.getElementById('ll').innerText = Math.round(data.main.temp - 273);
    document.getElementById('wl').innerText = data.wind.speed;
    data.rain ? 
    document.getElementById('pl').innerText = data.rain :
    ''
  })
  .catch(error => console.log('error', error));

  })
}

fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/crops.json", requestOptions )
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      const dataArray = []
    for(const key in data){
      dataArray.push(data[key]);
    }
    hideloader()
    const jss = id[0]

    dataArray.forEach(object =>{
        if(object.name == jss){
            
            document.querySelector('.img').src = object.image
            document.querySelector('.head').innerHTML = object.name
            
            document.querySelector('#temp').innerHTML = object.requirement.temp + ' <sup>o</sup>c'
            document.querySelector('#wind').innerHTML = object.requirement.wind + ' mph'
            document.querySelector('#rain').innerHTML = object.requirement.rainfall + ' ml'

            const temps = document.querySelector('#ll').innerText
            const winds = document.querySelector('#wl').innerText
            const rains = document.querySelector('#pl').innerText

            const weatherS = {rain:rains, temp:temps, wind:winds}
            const cropS = {rain:object.requirement.rainfall, temp:object.requirement.temp, wind:object.requirement.wind}
            console.log(cropS);
            console.log(weatherS);
            const weather = new WeatherPredictor(cropS, weatherS);
            const results = weather.getComparison();
            console.log(results);
            const prediction = weather.predict(results)
            console.log(prediction)
            document.querySelector('.season').innerHTML = prediction
            createCard(object.preplanting, object.planting, object.postplanting, );
        }
    });
  
    

    });
    
   const plantingCards=(data, num)=>{
    const wrapper = document.createElement('div');
    const text2 = document.createElement('p');
 
    //asign classes
    wrapper.className = 'sug-cards'
    text2.className = 'sugg-write'
    // console.log(data)
    //append
    wrapper.appendChild(text2)
 
    text2.innerHTML = data
    const suggest = 'sugg'+num 
    // console.log(suggest);
 document.getElementById(suggest).appendChild(wrapper);
 
 }
   const createCards=(data)=>{
    // console.log(data)

       for (let i = 0; i < data.length; i++) {
         Cards(data[i])
         
         
       }
   }
   const createCard=(data1, data2, data3)=>{

    for (let i = 1; i < data1.length; i++) {
         plantingCards(data1[i], 1)         
       }
    for (let i = 1; i < data2.length; i++) {
         plantingCards(data2[i], 2)         
       }
    for (let i = 1; i < data3.length; i++) {
        plantingCards(data3[i], 3)         
      }
   }



   