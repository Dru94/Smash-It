'use strict';
import './style.css';

// variable decalration
let weather_data;

const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");
const location = document.getElementById("loc");
const main = document.getElementById("w_main");
const description = document.getElementById("w_desc");
const icon = document.getElementById("icon");
const info = document.getElementById("infoIcon");
const temperature = document.getElementById("w_temp");
const tempCelcius = document.getElementById("w_tempC");
const tempFarenheit = document.getElementById("w_tempF");
const dt = document.getElementById("date");
const dIcon = document.getElementById("dailyImg");
const dTime = document.getElementById("dailyDt");
const foreCard = document.getElementById("forecast");
const contain = document.getElementById("contain");
const hourlyC = document.getElementById("hourlyC");



// Toggle functionality
navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

function navbarLinkClick() {
  if(navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}



function convertToDate(x){
	const milli=x*1000;
	const dateObj = new Date(milli);
	const humanFormat=dateObj.toLocaleString(undefined,{weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});

	return humanFormat;
}
function convertTime(y){
	const h=y*1000;
	const dateObj = new Date(h);
	const hFormat=dateObj.toLocaleString(undefined,{hour:'numeric', minute:'numeric'});

	return hFormat;	
}


// fetch data from api
async function fetchApi(){
	const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=40.730610&lon=-73.935242&exclude=minutely&appid=230956c9591d02e940089530fb387ffb';
	const response = await fetch(url);
	const data = await response.json();

	weather_data = data;

	location.innerHTML=weather_data.timezone;
	main.innerHTML=weather_data.current.weather[0].main;
	description.innerHTML=weather_data.current.weather[0].description;
	icon.src= "http://openweathermap.org/img/wn/"+weather_data.current.weather[0].icon+"@2x.png";
	temperature.innerHTML="Temp: "+weather_data.current.temp+"&#8490";
	dt.innerHTML=convertToDate(weather_data.current.dt);

	let daily = weather_data.daily.slice(1);
	let hourly = weather_data.hourly;
	

	daily.forEach( function(element, index) {
		// statements
		let z = document.createElement("h3");
		z.innerHTML=element.weather[0].main + " - " + element.weather[0].description;
		z.style.padding = '10px';
		z.style.textAlign = 'center'
		dTime.appendChild(z);

		let x = document.createElement("p");
		x.innerHTML=convertToDate(element.dt);
		x.style.marginLeft = '25px';
		dTime.appendChild(x);

		let y = document.createElement("img");
		y.style.marginTop="-55px";
		y.style.marginLeft="-10px"
		y.src="http://openweathermap.org/img/wn/"+element.weather[0].icon+"@2x.png";
		dTime.appendChild(y);

		let i = document.createElement("i");
		let a = document.createElement("a");

		i.className="fas fa-info-circle";
		i.style.const = '#fff';
		i.style.float = 'right';
		i.style.marginTop = '-45px';
		i.style.marginLeft="-30px";
		i.style.padding = '10px';
		a.appendChild(i);
		dTime.appendChild(a);

		let b = document.createElement("hr")
		b.style.color = '#008080';
		dTime.appendChild(b);

	});

	hourly.forEach( function(element, index) {
		// statements
		let p = document.createElement("img");
		p.src="http://openweathermap.org/img/wn/"+element.weather[0].icon+"@2x.png";
		hourlyC.appendChild(p);

		let q = document.createElement("p");
		q.innerHTML = convertTime(element.dt);
		q.style.color = '#48484a';
		hourlyC.appendChild(q)

		let r =document.createElement("h3");
		r.style.color = '#48484a';
		r.innerHTML = element.weather[0].description;
		hourlyC.appendChild(r);

	});
}

fetchApi()