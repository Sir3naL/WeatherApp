$( () => {
    function getWeather(lat, lon) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=30e8d7bd50aeb4b34015f872d60d51b0",
            dataType: "json",
            method: "GET",
            cache: false,
            success: function(response) {
                
                console.log(response);
                $("#weather").html(response.name + " ," + response.sys.country);
                
                let celsius = Math.round(response.main.temp - 273.15);
                let farenheit = Math.round(celsius * 9 / 5 + 32);
                
                $("#temperature").html(celsius + " °C");
                
                let temp = celsius + " °C";
                $("#temperature").on("click", function() {

                    console.log("works");    
                    
                    
                    if (temp == celsius + " °C") {
                        $("#temperature").html(farenheit + " °F");
                    } else {
                        $("#temperature").html(celsius + " °C");
                    }
                    
                    if (temp == farenheit + " °F") {
                        return temp = celsius + " °C"
                    } else {
                        return temp = farenheit + " °F"
                    }

                
                    
                       
                });
                
               let imgURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
               //console.log(imgURL)
               //if (response.weather[0].icon === '03d') {
                $("#icon").append(`<img class="image-stats" src=${imgURL}>`);
                   
               //}  
               
               let iconCon = response.weather[0].icon;
               let iconChar = iconCon.substring(iconCon.length - 1);
               console.log(iconChar);

               if (iconChar === 'd') {
                    $(document.body).css("background-image", 'url("http://globalmedicalco.com/photos/globalmedicalco/3/10474.jpg")');

               }

               if (iconChar === 'n') {
                $(document.body).css("background-image", 'url("https://i.pinimg.com/originals/c7/ec/a4/c7eca4a1bf5d4ad5db49192ba8ae0617.jpg")');

               }

                $("#condition").html("(" + response.weather[0].description + ")");

                $("#others").append("Humidity: " + response.main.humidity + " %");
                $("#others").append(`<br>Pressure: ${response.main.pressure} hPa`);
                $("#others").append(`<br>Wind speed: ${response.wind.speed} m/s`);
                $("#others").append(`<br>Cloudiness: ${response.clouds.all} %`);

                

                
            
            }    
        })


    }
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                getWeather(position.coords.latitude, position.coords.longitude);   
                $("#data").append("latitude: " + precisionRound(position.coords.latitude, 10) + "<br>longitude: " + precisionRound(position.coords.longitude, 10));
                

            })    
            function precisionRound(number, precision) {
                var factor = Math.pow(10, precision);
                return Math.round(number * factor) / factor;
              }
        }
    } 
        
    getLocation();  
})
    
    