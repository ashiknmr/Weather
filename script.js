const apiKey = "2b2f597289a6b7fb021d5f97331a895f";

document.querySelector("button").addEventListener("click", () => {
    let city = document.getElementById("cityInput").value;

    hideToast();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(async data => {

            // WEATHER DATA
            document.querySelector(".title").innerHTML = `Weather in ${data.name}`;
            document.querySelector(".temp").innerHTML = `${data.main.temp}°C`;
            document.querySelector(".description").innerHTML = data.weather[0].description;
            document.querySelector(".weather-icon").src = 
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.querySelector(".box:nth-child(1)").innerHTML = `Feels like: ${data.main.feels_like}`;
            document.querySelector(".box:nth-child(2)").innerHTML = `Humidity: ${data.main.humidity}%`;
            document.querySelector(".box:nth-child(3)").innerHTML = `Wind speed: ${data.wind.speed} m/s`;
            document.querySelector(".box:nth-child(4)").innerHTML = `Temperature Min: ${data.main.temp_min}°C`;
            document.querySelector(".box:nth-child(5)").innerHTML = `Temperature Max: ${data.main.temp_max}°C`;
            document.querySelector(".box:nth-child(6)").innerHTML = `Pressure: ${data.main.pressure} p`;


            const lat = data.coord.lat;
            const lon = data.coord.lon;

            const timeResponse = await fetch(
                `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`
            );

            const timeData = await timeResponse.json();

            document.querySelector(".date").innerHTML = `Date: ${timeData.date}`;
            document.querySelector(".time").innerHTML = `Time: ${timeData.time}`;
            
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
