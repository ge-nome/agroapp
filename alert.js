fetch("https://agroapp-34da1-default-rtdb.firebaseio.com/notifications.json" )
.then(function(res){
  return res.json();
})
.then(function(data){
//   console.log(data);
  const notifArray = []
for(const key in data){
  notifArray.push(data[key]);
}

//  console.log(notifArray)
 createCards(notifArray.reverse())

// console.log(found);
});

const Cards=(data)=>{
    const wrapper = document.createElement('div');
    const text1 = document.createElement('p');
    const text2 = document.createElement('p');
 
    //asign classes
    wrapper.className = 'n-card'
    text2.className = 'time-stamp'
    console.log(data)
    //append
    wrapper.appendChild(text1)
    wrapper.appendChild(text2)
 
    text1.innerHTML = data.message
    text2.innerHTML = data.timestamp
 document.getElementById('notif-cards').appendChild(wrapper);
 
 }
 const createCards=(data)=>{
    // console.log(data)

       for (let i = 0; i < data.length; i++) {
         Cards(data[i])
         
         
       }
   }