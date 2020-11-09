function loadAllPlaces(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      callback(response);
    }
  };
  xhttp.open("GET", "/api/places", true);
  xhttp.send();
}

function initMap() {
  var options = {
    zoom: 14,
    center: { lat: 43.651070, lng: -79.347015 },
  }

  loadAllPlaces(function(response) {
    var map = new google.maps.Map(document.getElementById("map"), options);

    response.forEach(function(item){
      addMarkers({
        coords: {
          lat: item.geometry.location.lat, lng: item.geometry.location.lng
        },
        name: item.name,
        address: item.address
      });
    });

    function addMarkers(locationData){
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        });
      }
      var marker = new google.maps.Marker({
        position: locationData.coords,
        map: map,
      });

      var infoWindow = new google.maps.InfoWindow({
        content:`<p>Name: ${locationData.name}</p>
                 <p>Address: ${locationData.address}</p>`
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  });
}