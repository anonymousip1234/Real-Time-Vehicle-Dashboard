// Initialize map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create empty marker layer
const markers = L.layerGroup().addTo(map);

// Connect to socket.io endpoint
const socket = io('http://172.178.104.95/');

// Function to populate the HTML table with data
function populateTable(data) {
    // const tableBody = document.querySelector('#data-table tbody');
    // Find the .item element inside .most-popular
console.log(data)
// Find the .item element inside .most-popular
let tag_list = ['battery_health','speed','engine_temperature','fuel_level','mileage','timestamp']
for (let tag of tag_list){
    let selector = '.most-popular .item .' + tag
    const itemElement = document.querySelector(selector);

// Find the existing <h4> tag inside .item
let h4Element = itemElement.querySelector('h4');

// If <h4> element doesn't exist, create a new one
if (!h4Element) {
    h4Element = document.createElement('h4');
    itemElement.appendChild(h4Element);
}

// Populate the <h4> element with battery_health data
h4Element.textContent = `${data[tag]}`;
}


// // Find the existing <p> tag inside .item
// let pElement = itemElement.querySelector('p');

// // If <p> element doesn't exist, create a new one
// if (!pElement) {
//     pElement = document.createElement('p');
//     itemElement.appendChild(pElement);
// }

// // Populate the <p> element with battery_health data
// pElement.textContent = `${data.battery_health}`;






    // tableBody.innerHTML = '';
    // const h4 =document.createElement('h4')
    // Create table row
    // const row = document.createElement('tr');
    // row.innerHTML = `
    //     <td>${data.latitude}</td>
    //     <td>${data.longitude}</td>
    //     <td>${data.battery_health}</td>
    //     <td>${data.speed}</td>
    //     <td>${data.engine_temperature}</td>
    //     <td>${data.fuel_level}</td>
    //     <td>${data.mileage}</td>
    //     <td>${new Date(data.timestamp * 1000)}</td>
    // `;
    // tableBody.appendChild(row);

    // Clear existing markers
    markers.clearLayers();

    // Add marker with popup for latitude and longitude
    const marker = L.marker([data.latitude, data.longitude]).addTo(markers);
    marker.bindPopup(`Latitude: ${data.latitude}<br>Longitude: ${data.longitude}`).openPopup();
}

// Listen for 'coordinates' event from socket.io
socket.on('coordinates', function(data) {
    // Populate the HTML table with received data
    populateTable(data);
});
