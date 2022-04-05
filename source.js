class WeatherPredictor{ 
  constructor( cropReq, weatherSpec){
      this.cReq = cropReq
      this.wSpec = weatherSpec
      // this.rainW = 50
      // this.tempW = 35
      // this.windW = 15
      // this.compRes = getComparison();
  
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
  
const locale = []
  
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
    console.log(data)

    document.getElementById('icon').src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById('ll').innerText = Math.round(data.main.temp - 273);
    document.getElementById('wl').innerText = data.wind.speed;
    document.getElementById('date').innerText = "Today in " + data.name;
    data.rain ? 
    document.getElementById('pl').innerText = data.rain :
    document.getElementById('pl').innerText = 'No rain'
  })
  .catch(error => console.log('error', error));

  })
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


const Cards=(data, prediction)=>{
   const anchor = document.createElement('a');
   const wrapper = document.createElement('div');
   const inner1 = document.createElement('div');
   const inner1_1 = document.createElement('div');
   const inner2 = document.createElement('div');
   const inner2_1 = document.createElement('div');
   const text1 = document.createElement('h1');
   const text2 = document.createElement('h3');
   const text3 = document.createElement('h5');
   const image = document.createElement('img');

   //asign classes
   wrapper.className = 'plants'
   inner1.className = 'plant-name'
   inner1_1.className = ''
   inner2.className = 'plant-image'
   inner2_1.className = 'blend'

   //append
   anchor.appendChild(wrapper)
   wrapper.appendChild(inner1)
   wrapper.appendChild(inner2)
   inner1.appendChild(inner1_1)
   inner2.appendChild(inner2_1)
   inner1_1.appendChild(text1)
   inner1_1.appendChild(text2)
   inner1_1.appendChild(text3)
   inner2.appendChild(image)

   text1.innerHTML = data.name
   text2.innerHTML = data.season + ' Season'
   text3.innerHTML = prediction.substring(0, 19)+'...'
   image.src = data.image
   anchor.href = '/details.html?name=' + data.name
document.getElementById('list').appendChild(anchor);

}
const createCards=(data)=>{
    for (let i = 0; i < data.length; i++) {
     

      const temps = document.querySelector('#ll').innerText
      const winds = document.querySelector('#wl').innerText
      const rains = document.querySelector('#pl').innerText
      const weatherS = {rain:rains, temp:temps, wind:winds}
      const cropS = {rain:data[i].requirement.rainfall, temp:data[i].requirement.temp, wind:data[i].requirement.temp}
     
      const weather = new WeatherPredictor(cropS, weatherS);
      const results = weather.getComparison();
      // console.log(results)
      const prediction = weather.predict(results)
      
      Cards(data[i], prediction)
      
    }
}
if(document.getElementById('wl').innerText > 30){
  document.getElementById('sn').innerHTML = "Your plants need to be watered today"
}
else{
  document.getElementById('sn').innerHTML = "Your plants will be fine today even if you dont water it"
}


const seasons = []

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let mName = month[d.getMonth()];
//for getting the season
fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/seasons.json", requestOptions )
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      //  console.log(data.wet);
       const season = data;
      //  console.log(season.dry);
       var found = season.dry.find(function (element) {
        return element == mName.toLowerCase();
    });
    if (found) {
      seasons.push('dry')
    }else{
      seasons.push('rainy')
    }
    
  })
    //for getting the crops
fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/crops.json", requestOptions )
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      // console.log(data);
      const cropsArray = []
      console.log(cropsArray);
      const cropsArray2=[]
    for(const key in data){
      cropsArray.push(data[key]);
    }
    
    cropsArray.forEach(object =>{

      // console.log(object.season);
      // console.log(seasons[0]);
      if(object.season == seasons){
          console.log(seasons);
          cropsArray2.push(object)
          
      }
  });
  // console.log(cropsArray2);
  createCards(cropsArray2)
    });
  
date = new Date()

// document.getElementById('date').innerHTML = "Today in Bida" ;


// document.getElementById("demo").innerHTML = name;