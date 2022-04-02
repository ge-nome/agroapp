const id = []
window.onload = ()=>{ const urlpar = window.location.href
    var url = new URL(urlpar);
    var d = url.searchParams.get("name")
    id.push(d)
}
fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/crops.json" )
    .then(function(res){
      return res.json();
    })
    .then(function(data){
    //   console.log(data);
      const dataArray = []
    for(const key in data){
      dataArray.push(data[key]);
    }
    // console.log(id)
    const jss = id[0]
    // console.log(jss)

    dataArray.forEach(object =>{
        if(object.name == jss){
            
            document.querySelector('.img').src = object.image
            document.querySelector('.head').innerHTML = object.name
            document.querySelector('.season').innerHTML = object.description
            document.querySelector('#temp').innerHTML = object.requirement.temp + ' <sup>o</sup>c'
            document.querySelector('#wind').innerHTML = object.requirement.wind + ' mph'
            document.querySelector('#rain').innerHTML = object.requirement.rainfall + ' ml'

            createCard(object.preplanting, object.planting, object.postplanting, );
        }
    });
  
    

    // console.log(found);
    });
    
   const plantingCards=(data, num)=>{
    const wrapper = document.createElement('div');
    const text2 = document.createElement('p');
 
    //asign classes
    wrapper.className = 'sug-cards'
    text2.className = 'sugg-write'
    console.log(data)
    //append
    wrapper.appendChild(text2)
 
    text2.innerHTML = data
    const suggest = 'sugg'+num 
    console.log(suggest);
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



   