sondag = () => {
  const s = new Date();  s.setDate(s.getDate() - s.getDay());
  let day = s.getDate();
  let month = s.getMonth() + 1;
  let year = s.getFullYear();
  let time = (`${year}-${month}-${day}`);
  return time
}
lordag = () => {
  const s = new Date();  s.setDate(s.getDate() - s.getDay() + 6);
  let day = s.getDate();
  let month = s.getMonth() + 1;
  let year = s.getFullYear();
  let time = (`${year}-${month}-${day}`);
  return time
}
let checkWeekDay = (data) => {
  let i = 0
  var time = ``
  while(time != data.end.dateTime){
    const s = new Date();  s.setDate(s.getDate() - s.getDay() + i); 
    let day = s.getDate();
    let month = s.getMonth() + 1;
    let year = s.getFullYear();
    var time = (`${year}-${month}-${day}`);
    i ++
  }
  return time
}
let week = []
let check = ``
// GOOGLE CALENDER API 

  //Fetch
fetch("https://www.googleapis.com/calendar/v3/calendars/c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com/events?key=<key>")
.then(res => res.json())
.then(res => res.items.forEach((data, index, array) => {
  let timeDate = data.end.dateTime
  getWeekDays(data,index, array)
}))

let getWeekDays = (data, index, array) => {
  data.end.dateTime = data.end.dateTime.slice(0, -15)
  if(data.end.dateTime >= sondag() && data.end.dateTime <= lordag()){
    week.push(checkWeekDay(data));
    week.sort();
    if(index === array.length - 1){
      console.log(week);
      divideWeekDays(week);
    }
  }
}

divideWeekDays = (week) => {
  let start = 0
  var lastWeekEvent = week[0];
    for(var i = 0; i < week.length; i++){
      var weekEvent = week[i];
      console.log(week[i])
      if(lastWeekEvent !== weekEvent){
        let chunk = []
        chunk = week.slice(0, i)
        week.splice(start, i)
        console.log(i)
        console.log(chunk)
        lastWeekEvent = weekEvent;
      }
  }
  console.log(week)
  //let chunk = []
  //chunk = week.slice(0, -1)
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

