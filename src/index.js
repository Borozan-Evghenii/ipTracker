import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./img/icon-location.svg";
import { ipValidator } from "./helpers/helpers";
("./helpers/helpers");

const button = document.querySelector(".search-bar__btn");
const input = document.querySelector(".search-bar__input");

button.addEventListener("click", () => {
  getLocation(input.value);
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getLocation(input.value);
  }
});

async function getLocation(ip) {
  if (ipValidator(ip)) {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_q4zmVz906oVFdUStz3dBW4PU7iZN4&ipAddress=${ip}`
    )
      .then((response) => response.json())
      .then(renderData);
  }
}

function renderData(data) {
  const ip = document.querySelector("#ip");
  const location = document.querySelector("#location");
  const timeone = document.querySelector("#timezone");
  const isp = document.querySelector("#isp");
  ip.innerText = data.ip;
  location.innerText = data.location.region;
  timezone.innerText = data.location.timezone;
  isp.innerText = data.isp;
  console.log(data);
  addLabel(data.location.lat, data.location.lng, data.location.region);
}

//map

let map = L.map("map").setView([51.505, -0.09], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function addLabel(lat, long, location) {
  map.flyTo([lat, long], 18);
  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
  });
  L.marker([lat, long], { icon: myIcon }).addTo(map).bindPopup(`${location}`);
}
