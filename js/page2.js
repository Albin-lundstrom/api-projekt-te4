  // function to get the unix time of this sunday
  sondag = () => {
    const s = new Date();  s.setDate(s.getDate() - s.getDay());
    let day = s.getDate();
    let month = s.getMonth() + 1;
    let year = s.getFullYear();
    let time = (`${year}-${month}-${day}`);
    return Date.parse(time);
  }
    // function to get the unix time of this weeks saturday
  lordag = () => {
    const s = new Date();  s.setDate(s.getDate() - s.getDay() + 6);
    let day = s.getDate();
    let month = s.getMonth() + 1;
    let year = s.getFullYear();
    let time = (`${year}-${month}-${day}`);
    return Date.parse(time);
  }
  
    // function to change the unix time to ephoc(local time)
  let unixToEphoc = (data) =>{
    var date = new Date(data);
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
      // if the minute is 0 then add a 0 so it looks better
    if(minutes == '0'){
      minutes = '00';
    }
    time = (`${hours}:${minutes}`);
    return time;
  }
  
  
    // variables outside of the foreach
  let week = [];
  let m_count = 0;
  let t_count = 0;
  let o_count = 0;
  let to_count = 0; 
  let f_count = 0;
  let mondayTd = document.getElementById('1');
  let tisdagTd = document.getElementById('2');
  let onsdagTd = document.getElementById('3');
  let torsdagTd = document.getElementById('4');
  let fredagTd = document.getElementById('5');
  
  // GOOGLE CALENDER API 
  
    //Fetch
  fetch("https://www.googleapis.com/calendar/v3/calendars/c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com/events?key=<key>")
  .then(res => res.json())
  .then(res => res.items.forEach((data, index, array) => {
    getWeekDays(data,index, array);
  }))
  
  
  let getWeekDays = (data, index, array) => {
      //Check for the end date time and parse in into unix time
    if (data.end.hasOwnProperty('dateTime') == true){
      data.end.dateTime = Date.parse(data.end.dateTime);
      data.start.dateTime = Date.parse(data.start.dateTime);
    }else{
        // If the event does not have a set end hour only set end date parse the date and change it to unix
      data.end.dateTime = Date.parse(data.end.date);
      data.start.dateTime = Date.parse(data.start.date);
    }
    
      // Check if the event is in the coming work week
    if(data.end.dateTime > sondag() && data.end.dateTime <= lordag()){
        // If it is in the week push into the array
      week.push(data);    
        // After the push into the array sort based on the end date
      (week.sort(
        (p1, p2) => 
        (p1.end.dateTime > p2.end.dateTime) ? 1 : (p1.end.dateTime < p2.end.dateTime) ? -1 : 0));
        // Check if the index of the last event is the same as the array.length -1 
        if(index === array.length - 1){
          // error check console.log of the array
        //console.log(week);
          // If the foreach is done send into another foreach based on the week array
        week.forEach((data, index) => {
          divideWeekDays(data, index);
        })
      }
    }
  }
  
  divideWeekDays = (data, index) => {
      // Get the day on the week for every event in the array
    let day = new Date(week[index].end.dateTime);
    let weekDay = day.getDay();
      // If the description is undefined then change it to being a empty string
        // makes it so it doesn't print "undefined"
    if(week[index].description == undefined){
      week[index].description = ``;
    }
      // Then check what day of the week 
    if(weekDay == 1){
      mondagTable(week, index);
    }else if(weekDay == 2){
      tisdagTable(week, index);
    }else if(weekDay == 3){
      onsdagTable(week, index);
    }else if(weekDay == 4){
      tordagTable(week, index);
    }else if(weekDay == 5){
      fredagTable(week, index);
    }
  }
  
  
    // Createing elements and everything you see
  let mondagTable = (week, index) => {
      // Main tr
    createElemClass('tr', '', mondayTd, 'class', 'mondag-Tr p-2');
    let mondagTr = document.getElementsByClassName('mondag-Tr');
  
      // Main div
    createElemClass('div', '', mondagTr[m_count], 'class', 'mondag-div container tr-div');
    let mondagDiv = document.getElementsByClassName('mondag-div');
  
      // Div with the time of the event
    createElemClass('div', '', mondagDiv[m_count], 'class', 'mon-time-div');
    let monTimeDiv = document.getElementsByClassName('mon-time-div');
    createElemClass('h4', `${unixToEphoc(week[index].start.dateTime)} - ${unixToEphoc(week[index].end.dateTime)}`, monTimeDiv[m_count], 'class', 'mon-time-h3 text-decoration-underline');
  
      // Div with the Summary of the event
    createElemClass('div', '', mondagDiv[m_count], 'class', 'mon-summary-div');
    let monSummaryDiv = document.getElementsByClassName('mon-summary-div');
    createElemClass('h4', `${week[index].summary}`, monSummaryDiv[m_count], 'class', 'mon-summary-h2')
  
      // Div with the description of the event
    createElemClass('div', '', monSummaryDiv[m_count], 'class', 'mon-disc-div');
    let monDiscDiv = document.getElementsByClassName('mon-disc-div');
    createElemClass('h5', `${week[index].description}`, monDiscDiv[m_count], 'class', 'mon-summary-h2')
  
      // Spacer between the events
    createElemClass('tr', '', mondayTd, 'class', 'spacer');
  
      // counter for the getElementsByClassName
    m_count += 1;
  }
  
  let tisdagTable = (week, index) => {
    createElemClass('tr', '', tisdagTd, 'class', 'tisdag-Tr');
    let tisdagTr = document.getElementsByClassName('tisdag-Tr');
  
    createElemClass('div', '', tisdagTr[t_count], 'class', 'tisdag-div container tr-div');
    let tisdagDiv = document.getElementsByClassName('tisdag-div');
  
    createElemClass('div', '', tisdagDiv[t_count], 'class', 'tis-time-div');
    let tisTimeDiv = document.getElementsByClassName('tis-time-div');
    createElemClass('h4', `${unixToEphoc(week[index].start.dateTime)} - ${unixToEphoc(week[index].end.dateTime)}`, tisTimeDiv[t_count], 'class', 'tis-time-h3 text-decoration-underline');
  
    createElemClass('div', '', tisdagDiv[t_count], 'class', 'tis-summary-div');
    let tisSummaryDiv = document.getElementsByClassName('tis-summary-div');
    createElemClass('h4', `${week[index].summary}`, tisSummaryDiv[t_count], 'class', 'tis-summary-h2')
  
    createElemClass('div', '', tisSummaryDiv[t_count], 'class', 'tis-disc-div');
    let tisDiscDiv = document.getElementsByClassName('tis-disc-div');
    createElemClass('h5', `${week[index].description}`, tisDiscDiv[t_count], 'class', 'tis-summary-h2')
  
    createElemClass('tr', '  ', tisdagTd, 'class', 'spacer');
    t_count += 1;
  }
  
  let onsdagTable = (week, index) => {
    createElemClass('tr', '', onsdagTd, 'class', 'onsdag-Tr');
    let onsdagTr = document.getElementsByClassName('onsdag-Tr');
  
    createElemClass('div', '', onsdagTr[o_count], 'class', 'onsdag-div container tr-div');
    let onsdagDiv = document.getElementsByClassName('onsdag-div');
  
    createElemClass('div', '', onsdagDiv[o_count], 'class', 'ons-time-div');
    let onsTimeDiv = document.getElementsByClassName('ons-time-div');
    createElemClass('h4', `${unixToEphoc(week[index].start.dateTime)} - ${unixToEphoc(week[index].end.dateTime)}`, onsTimeDiv[o_count], 'class', 'ons-time-h3 text-decoration-underline');
  
    createElemClass('div', '', onsdagDiv[o_count], 'class', 'ons-summary-div');
    let onsSummaryDiv = document.getElementsByClassName('ons-summary-div');
    createElemClass('h4', `${week[index].summary}`, onsSummaryDiv[o_count], 'class', 'ons-summary-h2')
  
    createElemClass('div', '', onsSummaryDiv[o_count], 'class', 'ons-disc-div');
    let onsDiscDiv = document.getElementsByClassName('ons-disc-div');
    createElemClass('h5', `${week[index].description}`, onsDiscDiv[o_count], 'class', 'ons-summary-h2')
  
    createElemClass('tr', '', onsdagTd, 'class', 'spacer');
    o_count += 1;
  }
  
  let tordagTable = (week, index) => {
    createElemClass('tr', '', torsdagTd, 'class', 'tordag-Tr');
    let tordagTr = document.getElementsByClassName('tordag-Tr');
  
    createElemClass('div', '', tordagTr[to_count], 'class', 'tordag-div container tr-div');
    let tordagDiv = document.getElementsByClassName('tordag-div');
  
    createElemClass('div', '', tordagDiv[to_count], 'class', 'tor-time-div');
    let torTimeDiv = document.getElementsByClassName('tor-time-div');
    createElemClass('h4', `${unixToEphoc(week[index].start.dateTime)} - ${unixToEphoc(week[index].end.dateTime)}`, torTimeDiv[to_count], 'class', 'tor-time-h3 text-decoration-underline');
  
    createElemClass('div', '', tordagDiv[to_count], 'class', 'tor-summary-div');
    let torSummaryDiv = document.getElementsByClassName('tor-summary-div');
    createElemClass('h4', `${week[index].summary}`, torSummaryDiv[to_count], 'class', 'tor-summary-h2')
  
    createElemClass('div', '', torSummaryDiv[to_count], 'class', 'tor-disc-div');
    let torDiscDiv = document.getElementsByClassName('tor-disc-div');
    createElemClass('h5', `${week[index].description}`, torDiscDiv[to_count], 'class', 'tor-summary-h2')
  
    createElemClass('tr', '', torsdagTd, 'class', 'spacer');
    to_count += 1;
  }
  
  let fredagTable = (week, index) => {
    createElemClass('tr', '', fredagTd, 'class', 'fredag-Tr');
    let fredagTr = document.getElementsByClassName('fredag-Tr');
  
    createElemClass('div', '', fredagTr[f_count], 'class', 'fredag-div container tr-div');
    let fredagDiv = document.getElementsByClassName('fredag-div');
  
    createElemClass('div', '', fredagDiv[f_count], 'class', 'fre-time-div');
    let freTimeDiv = document.getElementsByClassName('fre-time-div');
    createElemClass('h4', `${unixToEphoc(week[index].start.dateTime)} - ${unixToEphoc(week[index].end.dateTime)}`, freTimeDiv[f_count], 'class', 'fre-time-h3 text-decoration-underline');
  
    createElemClass('div', '', fredagDiv[f_count], 'class', 'fre-summary-div');
    let freSummaryDiv = document.getElementsByClassName('fre-summary-div');
    createElemClass('h4', `${week[index].summary}`, freSummaryDiv[f_count], 'class', 'fre-summary-h2')
  
    createElemClass('div', '', freSummaryDiv[f_count], 'class', 'fre-disc-div');
    let freDiscDiv = document.getElementsByClassName('fre-disc-div');
    createElemClass('h5', `${week[index].description}`, freDiscDiv[f_count], 'class', 'fre-summary-h2')
  
    createElemClass('tr', '', fredagTd, 'class', 'spacer');
    f_count += 1;
  }
  
  // Create Elem Functions
    // Specifiy Class or Id function
  function createElemClass(elem_name, elem_text, parent_elem, elem_class, elem_class_name){
    let elem = document.createElement(elem_name);
    let elem_txt = document.createTextNode(elem_text);
    elem.appendChild(elem_txt);
    elem.setAttribute(elem_class, elem_class_name)
    parent_elem.appendChild(elem);
  }
    // Both Id and Class function
  function createElemClassId(elem_name, elem_text, parent_elem, elem_class_name, elem_id_name){
    let elem = document.createElement(elem_name);
    let elem_txt = document.createTextNode(elem_text);
    elem.appendChild(elem_txt);
    elem.setAttribute("class", elem_class_name)
    elem.setAttribute("id", elem_id_name)
    parent_elem.appendChild(elem);
  }
  
  