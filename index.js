if ('serviceWorker' in navigator) {
    console.log('yes')
    navigator.serviceWorker.register('sw.js').then(
        registration => {
            console.log('SW Registered')
        }
    ).catch(error => {
        console.log(error)
    })
  }
  else{
      console.log('drift');
  }
  
  if('geolocation' in navigator){
      console.log('yes')
  }


