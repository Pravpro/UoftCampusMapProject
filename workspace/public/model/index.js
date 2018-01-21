var utsg = {lat: 43.6629, lng: -79.3957};
var utm = {lat: 43.5471, lng: -79.6660};
var utsc = {lat: 43.7841, lng: -79.1868};
var curMarker;
var curMap;

function initMap() {
    var location = utsg;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: location
    });
    curMap = map;
    contentString = '<div class="container" onclick="myFunction()">' +
                        '<div class="jumbotron">' + 
                            '<div class="row">' + 
                                '<div class="col-6">' +
                                  
                                '<img class="img-thumbnail" src="https://focus.library.utoronto.ca/attachments/0000/1570/U-of-T-logo.gif?1394222046">' +
                                  
                                '</div>' +
                                '<div class="col-6">' +
                                    
                                    '<h2>Event Name</h2>' +
                                    '<h3>Club Name</h3>' +
                                    '<p>' + 
                                        '<span id="cardTime">' +
                                            'Time: 1200 hr' +
                                        '</span>' +
                                        '<br>' +
                                        '<span>' +
                                            'Location: 234 street' +
                                        '</span>' +
                                        '<br>' +
                                        'Description of the event.' +
                                    '</p>' +
                                
                                '</div>' +
                             '</div>' +
                         
                        '</div>' +
                    '</div>';
                    
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    curMarker = marker;
}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation);
    } else { 
        $('#myLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function selectCampus(camp){
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 16,
    //     center: camp
    // });
    curMarker.setMap(null);
    curMap.setCenter(camp);
    var marker = new google.maps.Marker({
        position: camp,
        animation: google.maps.Animation.DROP,
        map: curMap
    });
    curMarker = marker;
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });
}

// function curLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(updateLocation);
//     } else { 
//         $('#myLocation').innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

function updateLocation(position) {
    curMarker.setMap(null);
    var curLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    var marker = new google.maps.Marker({
      position: curLocation,
      animation: google.maps.Animation.DROP,
      map: curMap
    });
    curMarker = marker;
    console.log(curLocation);
}

$("li").hover(function(){
    $(this).removeClass("shrink");
}, function(){
    $(this).addClass("shrink");
});

$("li").click(function(){
    $("#tabs").toggleClass("expand");
    if($("#tabs").hasClass("expand")) {
        if($(this).hasClass("search")){
            $('#content').html('<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">');
        }
    }
    else {
        $("#content").html("").hide();
    }
});

function createMarker(){
    var eventloc = {lat: 43.6629, lng: -79.3957};
    var marker = new google.maps.Marker({
        map: curMap,
        position: eventLoc
    });
    google.maps.event.addListener(marker, 'click', function() {
          
    });
}