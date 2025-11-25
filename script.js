const apiKey = "2b2f597289a6b7fb021d5f97331a895f";

document.querySelector("button").addEventListener("click", () => {
    let city = document.getElementById("cityInput").value;

    hideToast();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw new Error("City not found");
            }
            return res.json();
        })
        .then(data => {
            document.querySelector(".title").innerHTML = `Weather in ${data.name}`;
            document.querySelector(".temp").innerHTML = `${data.main.temp}°C`;
            const description = document.querySelector(".description");
            description.innerHTML = data.weather[0].description;
            document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.querySelector(".box:nth-child(1)").innerHTML = `Feels like: ${data.main.feels_like}`;
            document.querySelector(".box:nth-child(2)").innerHTML = `Humidity: ${data.main.humidity}%`;
            document.querySelector(".box:nth-child(3)").innerHTML = `Wind speed: ${data.wind.speed} m/s`;
            document.querySelector(".box:nth-child(4)").innerHTML = `Temprature min: ${data.main.temp_min}°C`;
            document.querySelector(".box:nth-child(5)").innerHTML = `Temprature Max: ${data.main.temp_max}°C`;
            document.querySelector(".box:nth-child(6)").innerHTML = `Pressure: ${data.main.pressure} p`;
            document.querySelector(".box:nth-child(7)").innerHTML = `Sea level: ${data.main.sea_level ? data.main.sea_level + ' MSL' : 'N/A'}`;
            document.querySelector(".box:nth-child(8)").innerHTML = `Ground level: ${data.main.grnd_level ? data.main.grnd_level : 'N/A'}`;
            document.getElementById("cityInput").value = "";
        })
        .catch(() => {
             showToast("⚠️ City not found! Please try again.");
        });
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.bottom = "150px";
    toast.style.opacity = "1";

    setTimeout(hideToast, 3000);
}
function hideToast() {
    const toast = document.getElementById("toast");
    toast.style.bottom = "-80px";
    toast.style.opacity = "0";
}