
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
    

  
  // document.getElementById("demo").innerHTML = name;