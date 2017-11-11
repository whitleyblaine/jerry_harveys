function initMap() {
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 40.296743, lng: -74.301145 }
});
directionsDisplay.setMap(map);

var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
};
document.getElementById('btnGo').addEventListener('click', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}