function loadPlaces() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);

      console.log(response[0]);

      document.getElementById("poutine-places").innerHTML = response[0].name;
    }
  };
  xhttp.open("GET", "/api/places", true);
  xhttp.send();
}

console.log('script loaded');

