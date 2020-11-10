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
        address: item.address,
        priceLevel: item.price_level,
        ratings: item.rating
      });
    });

    function addMarkers(placeData){
      var customMarker = {
        url: "/images/poutine-marker.png",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
      };
      var marker = new google.maps.Marker({
        position: placeData.coords,
        map: map,
        icon: customMarker,
      });
      var dollarSign;

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        });
      }


      function getDollarSign(priceLevel) {
        var dollarSignMap = {
          1: "$",
          2: "$$",
          3: "$$$"
        }
        if (dollarSignMap[priceLevel]) {
          return dollarSignMap[priceLevel];
        }
        return "$";
      }

      var infoWindow = new google.maps.InfoWindow({
        content:`<div class="location-data">
                   <p>Name: ${placeData.name}</p>
                   <p>Address: ${placeData.address}</p>
                   <p>Price Level: ${getDollarSign(placeData.priceLevel)} </p>
                   <p>Stars: ${placeData.ratings}</p>
                 </div>`
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  });
}