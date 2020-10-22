

// ------------body background

$(document).ready(function () {
    $("body").css({ "background-image": "url( 'clouds.jpg')","background-size":"stretch",
     "opacity":0.9  })
})
// ------Cities of world----------
$(document).ready(function () {
     arr = ['London', 'Tokyo', 'Perth', 'Paris']
     var con = ''
    $.each(arr, function (index, item) {
 $.ajax({
 type: 'GET',
 DataType: 'json',
  url: `http://api.weatherapi.com/v1/current.json?key=8f4d9aef20cc4cf1b7351209202210&q=${item}`,
async: false,
 success: juscallback
})
 function juscallback(rec) {
    
con += `
<div class="col-md-3 mt-md-0 mt-3"">
<div class="card">
<div class="card-header  m-auto">
 <h4 class="font-weight-bold ">  ${item}</h4>
</div>
  <div class="card-body">
 <div class="row">
<h5 class="font-weight-bold m-auto"> ${rec.location.country}</h5>
                            </div>
                <div class="row">
                    <div class="col-6 ">
                    Temp:${rec.current.temp_c} 
                    </div>
                    <div class="col-6">
                           <img src="${rec.current.condition.icon}"></img>
                            </div>
                        </div>
                        <div class="row">
                                <div class="col-6">
                                Windspeed:${rec.current.wind_kph}
                                </div>
                                <div class="col-6">
                                        ${rec.current.condition.text}
                                        </div>
                                    </div>
                </div>
              </div>
</div>

    `
        }

    })
    $("#world").append(con);
})

// ----------Cities of Telangana
$(document).ready(function () {
    arr = ['Hyderabad', 'Warangal', 'Karimnagar', 'Secunderabad']
    var con = ''
    $.each(arr, function (index, item) {




        $.ajax({
            type: 'GET',
            DataType: 'json',
            url: `http://api.weatherapi.com/v1/current.json?key=8f4d9aef20cc4cf1b7351209202210&q=${item}`,
            async: false,
            success: juscallback
        })
       
        function juscallback(rec) {
           
            con += `
        <div class="col-md-3 mt-md-0 mt-3">
            <div class="card">
                    <div class="card-header m-auto">
                    <h4 class="font-weight-bold ">  ${item}</h4>
                    </div>
                    <div class="card-body">
                    <div class="row">
                    <h5 class="font-weight-bold m-auto"> ${rec.location.country}</h5>
                            </div>
                    
                    <div class="row">
                        <div class="col-6 ">
                        Temp:${rec.current.temp_c} 
                        </div>
                        <div class="col-6">
                                <img src="${rec.current.condition.icon}" alt="icon" width:100% height:100%>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-6">
                                    Windspeed:${rec.current.wind_kph}
                                    </div>
                                    <div class="col-6">
                                            ${rec.current.condition.text}
                                            </div>
                                        </div>
                    </div>
                  </div>
    </div>
    
        `
        }

    })
    $("#telangana").append(con);
})
// ----------------Searching a city and forecast graph
$(document).ready(function () {

    $('#search').click(function () {
        var place = $('#ip1').val();
        $('#div12').empty();
        $('#div13').empty();


        $.ajax({

            type: 'GET',
            dataType: 'json',
            url: `http://api.weatherapi.com/v1/current.json?key=8f4d9aef20cc4cf1b7351209202210&q=${place}`,
            success: function (res) {
                console.log('response from server')
                console.log(res.location.name);
                var loc_name = res.location.name;
                var loc_region = res.location.region;
               
                if (res.current.temp_c > 20) {
                    $(".j-place").css({ "background-image": "url('clouds.jpg') " })
                }

                $('#div12').append(`    
              <div class="card col-md-12 mt-md-0 mt-3">
                      <div class="card-header  m-auto">
                      <h4 class="font-weight-bold ">  ${res.location.name}</h4>
                      </div>
                      <div class="card-body">
                      <div class="row">
                          <h5 class="font-weight-bold m-auto"> ${res.location.country}</h5>
                                  </div>
                      <div class="row">
                          <div class="col-6 ">
                          Temp:${res.current.temp_c} 
                          </div>
                          <div class="col-6">
                                  <img src="`+res.current.condition.icon+`"alt="icon" width:100% height:100%>
                                  </div>
                              </div>
                              <div class="row">
                                      <div class="col-6">
                                      Windspeed:${res.current.wind_kph}
                                      </div>
                                      <div class="col-6">
                                              ${res.current.condition.text}
                                              </div>
                                          </div>
                      </div>
                    </div>
      
      
      `

                )


            }
        });

// --------------graph drawing for searching a city
        $.ajax({
         type: 'GET',
            dataType: 'json',
            url: `http://api.weatherapi.com/v1/forecast.json?key=8f4d9aef20cc4cf1b7351209202210&q=${place}&days=3`,
            success: function (res) {
                console.log('response from server')
                console.log(res.location.name);
                var loc_name = res.location.name;
                var loc_region = res.location.region;
                // var date1=res.forecast.forecastday[1].date;
                date1 = res.forecast.forecastday[0].date;
                date2 = res.forecast.forecastday[1].date;
                date3 = res.forecast.forecastday[2].date;
                min_temp1 = res.forecast.forecastday[0].day.mintemp_c
                min_temp2 = res.forecast.forecastday[1].day.mintemp_c
                min_temp3 = res.forecast.forecastday[2].day.mintemp_c
                max_temp1 = res.forecast.forecastday[0].day.maxtemp_c
                max_temp2 = res.forecast.forecastday[1].day.maxtemp_c
                max_temp3 = res.forecast.forecastday[2].day.maxtemp_c
                google.charts.load('current', { 'packages': ['bar'] });
                google.charts.setOnLoadCallback(drawChart);
                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Date', 'MinTemp', 'MaxTemp'],
                        [`${date1}`, `${min_temp1}`, `${max_temp1}`],
                        [`${date2}`, `${min_temp2}`, `${max_temp2}`],
                        [`${date3}`, `${min_temp3}`, `${max_temp3}`],
                    ]);
                    var options = {
                        chart: {
                            title: `Weather Forecast for ${loc_name}`,
                            subtitle: 'Maximum Minimum Temperature',
                        }
                    };
                    var chart = new google.charts.Bar(document.getElementById('div13'));
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }


            }
        });

    })
})
  
// -----------Current Location with the forecast----------------------
$('#curloc').click(() => {
   
    $("#getloc").empty();
    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function (location) {
        console.log(location.country_name);
        console.log(location.state);
        console.log(location.city);
        console.log(location.latitude);
        console.log(location.longitude);
        console.log(location.IPv4);
var latitude=location.latitude;
var longitude=location.longitude;
$.ajax({

    type: 'GET',
    dataType: 'json',
    url: `http://api.weatherapi.com/v1/current.json?key=8f4d9aef20cc4cf1b7351209202210&q=${location.latitude},${location.longitude}`,
    success: function (res) {
        console.log('response from server')
        console.log(res.location.name);
        var loc_name = res.location.name;
        var loc_region = res.location.region;
        console.log(res.forecast);
        if (res.current.temp_c > 20) {
            $(".j-place").css({ "background-image": "url('clouds.jpg') " })
        }

        $('#getloc').append(`    
      <div class="card d-flex flex-wrap">
              <div class="card-header  m-auto">
              <h4 class="font-weight-bold ">  ${res.location.name}</h4>
              </div>
              <div class="card-body">
              <div class="row">
                  <h5 class="font-weight-bold m-auto"> ${res.location.country}</h5>
                          </div>
              <div class="row">
                  <div class="col-6 ">
                  Temp:${res.current.temp_c} 
                  </div>
                  <div class="col-6">
                          <img src="`+res.current.condition.icon+`"alt="icon" width:100% height:100%>
                          </div>
                      </div>
                      <div class="row">
                              <div class="col-6">
                              Windspeed:${res.current.wind_kph}
                              </div>
                              <div class="col-6">
                                      ${res.current.condition.text}
                                      </div>
                                  </div>
              </div>
            </div>


`
 )
 }
});

////---------graph drawing for current city
$.ajax({
    type: 'GET',
       dataType: 'json',
       url: `http://api.weatherapi.com/v1/forecast.json?key=8f4d9aef20cc4cf1b7351209202210&q=${location.latitude},${location.longitude}&days=3`,
       success: function (res) {
           console.log('response from server')
           console.log(res.location.name);
           var loc_name = res.location.name;
           var loc_region = res.location.region;
           // var date1=res.forecast.forecastday[1].date;
           date1 = res.forecast.forecastday[0].date;
           date2 = res.forecast.forecastday[1].date;
           date3 = res.forecast.forecastday[2].date;
           min_temp1 = res.forecast.forecastday[0].day.mintemp_c
           min_temp2 = res.forecast.forecastday[1].day.mintemp_c
           min_temp3 = res.forecast.forecastday[2].day.mintemp_c
           max_temp1 = res.forecast.forecastday[0].day.maxtemp_c
           max_temp2 = res.forecast.forecastday[1].day.maxtemp_c
           max_temp3 = res.forecast.forecastday[2].day.maxtemp_c
           google.charts.load('current', { 'packages': ['bar'] });
           google.charts.setOnLoadCallback(drawChart);
           function drawChart() {
               var data = google.visualization.arrayToDataTable([
                   ['Date', 'MinTemp', 'MaxTemp'],
                   [`${date1}`, `${min_temp1}`, `${max_temp1}`],
                   [`${date2}`, `${min_temp2}`, `${max_temp2}`],
                   [`${date3}`, `${min_temp3}`, `${max_temp3}`],
               ]);
               var options = {
                   chart: {
                       title: `Weather Forecast for ${loc_name}`,
                       subtitle: 'Maximum Minimum Temperature',
                   }
               };
               var chart = new google.charts.Bar(document.getElementById('graph13'));
               chart.draw(data, google.charts.Bar.convertOptions(options));
           }


       }
   });




      }
    });
 })
//  ---------------------Cities Of India---------------------------------------------------
 $(document).ready(function(){
    myarray = ['Delhi', 'Mumbai', 'Bengaluru','Chennai']
    var state = ''
    
    $.each(myarray, function (index, item) {
    
    
        $.ajax({
            type: 'GET',
            DataType: 'json',
            url: `http://api.weatherapi.com/v1/current.json?key=8f4d9aef20cc4cf1b7351209202210&q=${item}`,
            async: false,
            success: searchCallback
        });
    
        function searchCallback(res) {
    
          
            state +=
                `
         <div class="carousel-item">
         <img src="sunset.jpg" class="d-block w-100" alt="${res.location.name}" width="1100px" height="400px">
         <div class="carousel-caption d-block">
           <h3>${res.location.name} Weather</h3>
           <p id="temp">Temp :${res.current.temp_c} deg <span id="temp_max" style="margin:30px">Max-Temp :${res.current.temp_c} deg</span></p>              
                   <p id="temp-min">Min-Temp :${res.current.temp_c} deg <span  id="humidity" style="margin:30px">Humidity :${res.current.temp_c} g.kg-1</span></p>
                   <p id="pressure">Pressure :${res.current.temp_c} N/m^2 <span  id="wind" style="margin:30px">Wind-Speed :${res.current.temp_c} m/s</span></p>         
         </div>
         </div>
         `
    
        }
       
    
    });
   
    $('.state').append(state);


 })