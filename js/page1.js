function displayDateTime() {
    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    var timeString = hours + ":" + minutes + ":" + seconds;
    var dateString = day + "/" + month + "/" + year;

    var dateTimeString = dateString + " " + timeString;

    document.getElementById("title-div").innerHTML = dateTimeString;
}
displayDateTime()

// SL INFORMATION OCH API KOD

// fetch("https://api.sl.se/api2/typeahead.json?key=b7df748892994b01837394ec13a33b54&searchstring=Flemingsberg")
// .then(res => res.json())
// .then(res => console.log(res))


fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=<key>&siteid=7006&timewindow=30")
.then(res => res.json())
//.then(res => console.log(res))
.then(res => res.ResponseData.Trains.forEach((data) => {
    trainData(data)
}))


const trainData = (data) => {
    let togElm = document.getElementById("tog-div")
    let trainInfo = ""
    trainInfo +=     `
                <div class="container-lg bg-info sl-parent">
                    <div class="sl-items1">
                        <div class="sl-icons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/BSicon_Train-CHN.svg" alt="Train" class="img-fluid sl-icon">
                        </div>
                        <span class="container-sm sl-number sl-icons"> ${data.LineNumber.trim()}</span>
                    </div>
                    <div class="sl-items2">
                        <span class="sl-info">
                            <h4>
                            ${data.Destination.trim()}
                            </h4>
                        </span>
                        <span class="sl-info">
                            <p>
                            ${data.DisplayTime.trim()}
                            </p>
                        </span>
                    </div>
                </div>
    `
    togElm.innerHTML += trainInfo
}


let time = ""
fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=<key>&siteid=7000&timewindow=30")
.then(res => res.json())
//.then(res => console.log(res))
.then(res => busData(res.ResponseData.Buses))


const busData = (data) => {
    let busElm = document.getElementById("bus-div")
    let comBusTime = "";
    for(var i = 0; i < data.length; i++){
        for(var j = i+1; j < data.length; j++){
            if(data[i].Destination === data[j].Destination){
                comBusTime = data[j].DisplayTime;
                console.log(data[j].DisplayTime);
                break;
            }else{
                comBusTime = "";
            }
        }
        let busInfo = "";
    if (data[i].GroupOfLine == "blåbuss"){
        var color = "blue";
    }else{
        var color = "normal";
    }
    busInfo +=     `
                <div class="container-lg bg-info sl-parent">
                    <div class="sl-items1">
                        <div class="sl-icons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Aiga_bus_on_blue_circle.svg" alt="Bus" class="img-fluid sl-icon">
                        </div>
                        <span class="container-sm bus-number-${color} sl-icons"> ${data[i].LineNumber.trim()}</span>
                    </div>
                    <div class="sl-items2">
                        <span class="sl-info">
                            <h4>
                            ${data[i].Destination.trim()}
                            </h4>
                        </span>
                        <span class="sl-info">
                            <p>
                            ${data[i].DisplayTime.trim()}
                            </p>
                        </span>
                        <span class="sl-info">
                            <p>
                                ${comBusTime}
                            </p>
                        </span>
                    </div>
                </div>
    `
    busElm.innerHTML += busInfo;
    console.log(comBusTime);
    }
    
}


// VÄDER API OCH INFORMATION

fetch("https://api.openweathermap.org/data/2.5/weather?lat=59.3251172&lon=18.0710935&units=Metric&appid=<key>")
.then(res => res.json())
.then(res =>  weatherData(res)
)
fetch("https://api.openweathermap.org/data/2.5/forecast?lat=59.3251172&lon=18.0710935&units=Metric&appid=<key>")
.then(res => res.json())
.then(res => res.list.forEach((data) => {
    weatherForecast(data);    
}))

function createElemClass(elem_name, elem_text, parent_elem, elem_class, elem_class_name){
    let elem = document.createElement(elem_name);
    let elem_txt = document.createTextNode(elem_text);
    elem.appendChild(elem_txt);
    elem.setAttribute(elem_class, elem_class_name)
    parent_elem.appendChild(elem);
}function createElemClassId(elem_name, elem_text, parent_elem, elem_class_name, elem_id_name){
    let elem = document.createElement(elem_name);
    let elem_txt = document.createTextNode(elem_text);
    elem.appendChild(elem_txt);
    elem.setAttribute("class", elem_class_name)
    elem.setAttribute("id", elem_id_name)
    parent_elem.appendChild(elem);
}


const weatherData = (data) => {
    // MAIN DIVS
    let my_div = document.getElementById('Weather-div');
    createElemClassId('div', ``, my_div,  "container-lg bg-info weather-parent", "weather-main-div");
    let newDiv = document.getElementById('weather-main-div');
    // VÄNSTER OCH HÖGER DIV
           // cityDiv
    createElemClassId('div', `${data.name} - ${data.sys.country}`, newDiv, "container-lg", "cityDiv");
    createElemClassId('div', ``, newDiv, "container-lg", "left-div");
    createElemClassId('div', ``, newDiv,  "container-lg","right-div");
    let leftDiv = document.getElementById('left-div');
    let rightDiv = document.getElementById('right-div');
    // VÄNSTRA DIV
    // DIV
        // infoDivs
    createElemClassId('div', ``, leftDiv,  "container-lg","info-div")
    let infoDiv = document.getElementById('info-div');
    createElemClass('div', ``, infoDiv,  "class","container-lg info-child-div");
    createElemClass('div', ``, infoDiv,  "class","container-lg info-child-div");
    createElemClass('div', ``, infoDiv,  "class","container-lg info-child-div");
    let infoChild = document.getElementsByClassName("info-child-div");
        // info divs child 1
    weathericon = document.createElement("img");
    weathericon.setAttribute("id", "Weather-icon");
    weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    infoChild[0].appendChild(weathericon);
    createElemClassId('div', `${data.main.temp} °C`, infoChild[0],  "container-lg","tempDiv");
        // info divs child 2
    createElemClassId('div', `Feels Like: ${data.main.feels_like} °C`, infoChild[1],  "container-lg","feelDiv");
        // info divs child 3
    createElemClassId('div', data.weather[0].main, infoChild[2],  "container-lg","vaderDiv");
    createElemClassId('div', data.weather[0].description, infoChild[2],  "container-lg","decDiv");



    // HÖGRA DIV 
    // DIV 
        // MIN MAX DIVS
        createElemClassId('div', ` Max: ${data.main.temp_max} °C`, rightDiv, "container-lg", "maxDiv");
        createElemClassId('div', `Min: ${data.main.temp_min} °C`, rightDiv, "container-lg", "minDiv");
        //EXTRA DATA
        createElemClassId('div', "", rightDiv, "container-lg", "data-div");
        let dataDiv = document.getElementById('data-div');
        createElemClassId('div', "", dataDiv, "container-lg", "humWin-Div");
        let humWinDiv = document.getElementById("humWin-Div");
        createElemClassId('div', "", dataDiv, "container-lg", "visHpa-Div");
        let visHpaDiv = document.getElementById("visHpa-Div");
        //Humidity and wind speed
        createElemClassId('div', `Humidity: ${data.main.humidity}%`, humWinDiv, "container-lg", "humidityDiv");
        createElemClassId('div', `${data.wind.speed}m/s W`, humWinDiv, "container-lg", "windDiv");
        //Visibility and hpa
        createElemClassId('div', `Visibility: ${data.visibility}m`, visHpaDiv, "container-lg", "visDiv");
        createElemClassId('div', `${data.main.pressure} hpa`, visHpaDiv, "container-lg", "hpaDiv");
        
}

let forecastDiv = document.getElementById('forecast-div');
let index = 0

const weatherForecast = (data) => {
    if (data.dt_txt.slice(11) == "15:00:00"){
        data.dt_txt = data.dt_txt.slice(5)
        data.dt_txt = data.dt_txt.slice(0, -8)
        let dt_txt = data.dt_txt.trim()

        // INFO FORECAST
        createElemClass('div', ``, forecastDiv, "class", "weather-main-fore-div weather-parent container-lg bg-info");
        let newDiv = document.getElementsByClassName('weather-main-fore-div');

            // Date and icon div 
        createElemClass('div', ``, newDiv[index], "class", "container-lg data-div");
        let dataDiv = document.getElementsByClassName('data-div');

            // Date and MAX MIN
        
        data.main.temp_max = data.main.temp_max.toString().slice(0, -1) 
        data.main.temp_min = data.main.temp_min.toString().slice(0, -1) 
        createElemClass('div', dt_txt, dataDiv[index], "class",  "container-lg bg-info date-div");
        createElemClass('div', `${data.main.temp_max}/${data.main.temp_min} °C`, newDiv[index], "class",  "container-lg bg-info maxMinDiv");

            //ICON
        weathericon = document.createElement("img");
        weathericon.setAttribute("class", "Weather-fore-icon");
        weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        dataDiv[index].appendChild(weathericon);

            // DESCRIPTION
        createElemClass('div', data.weather[0].description, newDiv[index],  "class",  "container-lg decForeDiv");
        index += 1
    }

}

//fetch("https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=<key>")
//.then(res => res.json())
////.then(res => console.log(res.results.lists[1].books))
//.then(res => res.results.lists[1].books.forEach((data) => {
//    bookListFunc(data);
//}))


let bookList = document.getElementById("book-list");
let counter = 0

const bookListFunc = (data) => {
    // List Item TAg
    createElemClass("li", "", bookList, "class", "book-list-item");
    let bookListItem = document.getElementsByClassName("book-list-item");
    // Main Book Div
    createElemClass("div", "", bookListItem[counter], "class", "book-div container-lg bg-light book-parent");
    let bookDiv = document.getElementsByClassName("book-div");
    // Main Book Info Divs
    createElemClass('div', data.rank, bookDiv[counter], "class", "BookRanking-Div");
    createElemClass('div', "", bookDiv[counter], "class", "BookInfo-Div")
    let bookInfoDiv = document.getElementsByClassName("BookInfo-Div")
    // Info Div Divs
    createElemClass('div', data.title, bookInfoDiv[counter], "class", "bookTitle-Div");
    createElemClass('div', data.contributor, bookInfoDiv[counter], "class", "bookAuther-Div");
    createElemClass('div', "", bookInfoDiv[counter], "class", "bookReview-Link");
    let reviewDiv = document.getElementsByClassName("bookReview-Link");

    //Anchor Review Tag 
    if(data.book_review_link !== ""){
        let createA = document.createElement('a');
        let createAText = document.createTextNode("Review");
        createA.setAttribute('href', `${data.book_review_link}`);
        createA.setAttribute('target', '_blank');
        createA.appendChild(createAText);
        reviewDiv[counter].appendChild(createA);
    }
    counter += 1
}

bookListFunc()