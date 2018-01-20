var utsg = {lat: 43.6629, lng: -79.3957};
var utm = {lat: 43.5471, lng: -79.6660};
var utsc = {lat: 43.7841, lng: -79.1868};

function initMap() {
    var location = utsg;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
}

$('myLocation').on('click', curLocation());

function curLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function() {
          var curLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
          location = curLocation;
          console.log(curLocation);
        });
    } else { 
        $('myLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}
