//Geo locations code

//HTML5 geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


var latlon;
var map;
//show the location
function showPosition(position) {

    var lat=position.coords?position.coords.latitude:position.lat;
    var lng=position.coords?position.coords.longitude:position.lng;
    
    latlon = lat + "," + lng;

    var myLatLng = { lat: lat, lng: lng };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: myLatLng
    });

    new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'You are here!'
    });

    $("#pointsofi").html("");
    loadPointsOfInterest();

}

//customize pin on maps
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}

//load the points of interest in radius 2000
function loadPointsOfInterest(){
    var settings = {
        "async": true,
        // /*"dataType": 'text',
        // "contentType": "application/json; charset=utf-8",*/
        "headers":{
            "Access-Control-Allow-Origin": "*"

        },
        "crossDomain": true,
        "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBZYZbJI_suqw9VC2D1u1Us2e1j0f1mFus&location=" + latlon + "&radius=10000&type=bar",
        "method": "GET"
    }
      


    $.ajax(settings).done(function (response) {
        console.log(response.results);
        response.results.forEach(function (location) {
           // console.log(res);
            
            
            $("#pointsofi").append("<li>" + "<button class='apple'>" +location.name+  "</button>"+ " , " + " Rating: " +location.rating+"</li>");
           var myLatLng = { lat: location.geometry.location.lat, lng: location.geometry.location.lng }
           new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: location.name,
                icon: pinSymbol("green")
            });
        });
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}




        // $(".btn1").click(function() {
        //     window.location.href="location.html"

        // });



    
    
        function loadMap(e) {
            if (e != undefined) {
                 e.preventDefault();
            }
            $.ajax("https://maps.googleapis.com/maps/api/geocode/json?address="+$("#text1").val()+"&key=AIzaSyBZYZbJI_suqw9VC2D1u1Us2e1j0f1mFus").done((res) => {
            pos = res["results"][0]["geometry"]["location"]
            showPosition(pos);
            });

};


