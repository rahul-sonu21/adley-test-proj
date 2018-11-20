// Global variables
var map;
var apiDomain = 'http://localhost:3000/';

function showComponent(componentId, buttonId) {
    activateComponent(componentId);
    activateButton(buttonId);

    // Show List
    if(componentId == 'listView') {
        showList();
    }
}

function activateButton(buttonId) {
    var buttons = document.getElementsByTagName('button');
    var len = buttons.length;
    for(var i = 0; i < len; i++){
        buttons[i].classList.remove('btn-active');
    }

    document.getElementById(buttonId).classList.add('btn-active');
}

function activateComponent(componentId) {
    var divs = document.getElementsByClassName('content');
    var len = divs.length;
    for(var i = 0; i < len; i++){
        divs[i].style.display = "none";
    }

    document.getElementById(componentId).style.display = 'block';
}

// Google map callback method
function initMap() {
    map = new google.maps.Map(document.getElementById('mapView'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    setMarkers();
}

function showList() {
    var listViewData = document.getElementById('listView-data');
    listViewData.innerHTML = 'Please wait loading your content...';
    getLocations(function(locations) {
        listViewData.innerHTML = '';
        var locations = JSON.parse(locations);
        if(locations && locations.length > 0) {
            var locationsLen = locations.length;
            for(i=0; i<locationsLen; i++) {
                listViewData.innerHTML += createLocationBox(locations[i]);
            }
        }
    }); 
}

function createLocationBox(locationObj) {
    var locBox =
    '<div class="loc-box">'+
        '<div>Name: ' + locationObj.name + '</div>'+
        '<div>Latitude: ' + locationObj.latitude + '</div>'+
        '<div>Longitude: ' + locationObj.longitude + '</div>'+
    '</div>';
    return locBox;
}

function setMarkers() {
    getLocations(function(locations) {
        var locations = JSON.parse(locations);
        if(locations && locations.length > 0) {
            var locationsLen = locations.length;
            for(i=0; i<locationsLen; i++) {
                var marker = createMarker(locations[i]);
                marker.setMap(map);
            }
        }
    });
}

function getLocations(callback) {
    sendAjaxReg('locations', function(data) {
        callback(data);
    });
}

function sendAjaxReg(apiEndpoint, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open('GET', apiDomain + apiEndpoint, true);
    xhttp.send();
}

function createMarker(locationObj) {
    var myLatLng = {lat: locationObj.latitude, lng: locationObj.longitude};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: locationObj.name
    });
    return marker;
}

// Show Map component by default
showComponent('mapView', 'btnMap');
