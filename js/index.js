// Global variables
var map;
var apiDomain = 'http://localhost:3000/';

function showComponent(componentId, buttonId) {
    activateComponent(componentId);
    activateButton(buttonId);
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
}

// Show Map component by default
showComponent('mapView', 'btnMap');
