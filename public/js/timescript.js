var time = {};
time.date = new Date();
time.data = {
    GET_FULL_YEAR: time.date.getFullYear(),
    GET_MONTH: time.date.getMonth(),
    GET_DAYS: time.date.getDay(),
    GET_HOURS: time.date.getHours(),
    GET_MINUTES: time.date.getMinutes(),
    GET_SECONDS: time.date.getSeconds(),
}
time.measuredData = { };
switch(time.data.GET_MONTH) {
    case 0:
        time.measuredData.GET_MONTH = "January";
        break;
      case 1:
      time.measuredData.GET_MONTH  = "Febuary";
        break;
      case 2:
      time.measuredData.GET_MONTH  = "March";
        break;
      case 3:
      time.measuredData.GET_MONTH  = "April";
        break;
      case 4:
      time.measuredData.GET_MONTH  = "May";
        break;
      case 5:
      time.measuredData.GET_MONTH  = "June";
        break;
      case 6:
      time.measuredData.GET_MONTH  = "July";
        break;
      case 7: 
      time.measuredData.GET_MONTH  = "August";
        break;
      case 8:
      time.measuredData.GET_MONTH = "September";
        break;
      case 9:
      time.measuredData.GET_MONTH  = "October";
        break;
      case 10:
      time.measuredData.GET_MONTH  = "November";
        break;
      case 11:
      time.measuredData.GET_MONTH  = "December";
        break;

}
switch(time.data.GET_DAYS) {
    case  0:
        time.measuredData.GET_DAY = "Sunday";
        break;
      case  1:
        time.measuredData.GET_DAY = "Monday";
        break;
      case 2:
        time.measuredData.GET_DAY = "Tuesday";
        break;
      case 3:
        time.measuredData.GET_DAY = "Wednesday";
        break;
      case 4:
        time.measuredData.GET_DAY = "Thrusday";
        break;
      case 5:
        time.measuredData.GET_DAY = "Friday";
        break;
      case 6:
        time.measuredData.GET_DAY = "Saturday";
        break;

}

time.measuredData.GET_FULL_YEAR = time.data.GET_FULL_YEAR;
time.measuredData.GET_HOURS = time.data.GET_HOURS;
time.measuredData.GET_MINUTES = time.data.GET_MINUTES;
time.measuredData.GET_SECONDS = time.data.GET_SECONDS;



