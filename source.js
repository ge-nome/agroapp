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
    // console.log(data.main.temp)
    // document.getElementById('w-cond').innerHTML = data.weather[0].description;
    document.getElementById('icon').src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById('ll').innerHTML = Math.round(data.main.temp - 273);
    document.getElementById('wl').innerHTML = data.wind.speed;
    data.rain ? 
    document.getElementById('pl').innerHTML = data.rain :
    ''
  })
  .catch(error => console.log('error', error));

  })
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


const Cards=(data)=>{
   const anchor = document.createElement('a');
   const wrapper = document.createElement('div');
   const inner1 = document.createElement('div');
   const inner1_1 = document.createElement('div');
   const inner2 = document.createElement('div');
   const inner2_1 = document.createElement('div');
   const text1 = document.createElement('h1');
   const text2 = document.createElement('h4');
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
   inner2.appendChild(image)

   text1.innerHTML = data.name
   text2.innerHTML = data.season + ' Season'
   image.src = data.image
   anchor.href = '/details.html?name=' + data.name
document.getElementById('list').appendChild(anchor);

}
const createCards=(data)=>{
    for (let i = 0; i < data.length; i++) {
      Cards(data[i])
      
      
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
fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/seasons.json" )
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
      seasons.push('wet')
    }
    
  })
    //for getting the crops
fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/crops.json" )
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      // console.log(data);
      const cropsArray = []
      const cropsArray2=[]
    for(const key in data){
      cropsArray.push(data[key]);
    }
    
    cropsArray.forEach(object =>{
      if(object.season == seasons){
          // console.log(object);
          cropsArray2.push(object)
          
      }
  });
  createCards(cropsArray2)
    });
  
date = new Date()

document.getElementById('date').innerHTML = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();


// document.getElementById("demo").innerHTML = name;