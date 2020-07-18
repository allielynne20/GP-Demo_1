var searchEl = document.querySelector("#searchBtn");
var cityName = document.getElementById("cityname");

$("#searchBtn").on("click", function () {
    event.preventDefault();
    var cityName = $("#cityname").val();
    console.log(cityName);
    cityName.value = "";
    saveCityBrew(cityName);
    saveCityEvent(cityName);
})


function saveCityBrew(cityName) {

    fetch(
        'https://api.openbrewerydb.org/breweries?by_city=' + cityName)
        .then(res => res.json())
        .then(function (data) {
            Brew(data);
        });
}


function Brew(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (i < 10) {
            var brewEl = $('<div>').addClass("mainFood");
            var brewList = $('<p>').addClass("brewlist").text(data[i].name);
            var brewURL = $('<a>').addClass("brewURL").attr('href', data[i].website_url).text(data[i].website_url);
            var brewaddress = $('<p>').addClass("brewAddr").text(data[i].street);
            var brewcode = $('<p>').addClass("brewCode").text(data[i].postal_code);
            var brewcity = $('<p>').addClass("brewCity").text(data[i].city);
            var brewphone = $('<p>').addClass("brewPhone").text(data[i].phone);

            brewcity.append(brewcode);
            brewaddress.append(brewcity);
            brewEl.append(brewList, brewURL, brewaddress, brewphone);
            $("#callout1").append(brewEl);
        }
    }
}


function saveCityEvent(cityName) {

    var events = 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + cityName + '&size=1&apikey=iXIL7zyvzVd6feevOuPN5Kj5OiJTxxwp';

    $.ajax({
        type: "GET",
        url: events,
        async: true,
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response._embedded.events[0].url);
            // Parse the response.
            var eventEl = $('<div>').addClass("mainEvent");
            var eventList = $('<p>').addClass("eventlist").text(response._embedded.events[0].name);
            var eventURL = $('<a>').addClass("eventURL").attr('href', response._embedded.events[0].url).text(response._embedded.events[0].url);
            
            eventEl.append(eventList, eventURL);
            $("#callout2").append(eventEl);
        },
        // error: function (xhr, status, err) {
        //     // This time, we do not end up here!
        // }
    });
}

// searchEl.addEventListener("click", saveCityBrew)
// searchEl.addEventListener("click", saveCityEvent)