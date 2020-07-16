function equalDate(dateA, dateB) {
  return dateA.getYear === dateB.getYear 
    && dateA.getMonth() === dateB.getMonth() 
    && dateA.getDate() === dateB.getDate(); 
}

/*
function equalMonth(dateA, dateB) {
  return dateA.getYear === dateB.getYear 
    && dateA.getMonth() === dateB.getMonth(); 
}
*/
const LocalMonths = [ 
  'Jan',
  'Feb',
  'Mär',
  'Apr',
  'Mai',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dez'
];

module.exports = function calendarDays (dateArg, ) {

  const date = dateArg ? dateArg : new Date(); 
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long',
    day: 'numeric' };
  const digitOptions = {
    minimumIntegerDigits: 2 
  };  

  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const daysOfMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthIndex, 1, 3); 
  const lastDayOfMonth = new Date(year, monthIndex, daysOfMonth, 3); 
  const firstWeekDayOfMonth = firstDayOfMonth.getDay(); 
  const lastWeekDayOfMonth = lastDayOfMonth.getDay(); 


  const firstDayOfCal = 1 - ( firstWeekDayOfMonth || 7) + 1; 
  

  const lastDayOfCal = daysOfMonth + (7 - lastWeekDayOfMonth); 
  
  const calMonth = [];

  for (let i = firstDayOfCal; i <= lastDayOfCal; i++) {

    const calDate = new Date(year, monthIndex, i, 3); 
    const weekDay = calDate.getDay();
 
    let calWeek;
    if (weekDay === 1) {
      if (calWeek) { 
        calMonth[calMonth.length -1] = calWeek; 
      } 
    } else {
      calWeek = calMonth[calMonth.length - 1];
    }

    if (!calWeek) { 
      calWeek = []; 
      calMonth.push(calWeek); 
    }

    calWeek.push({ 
      weekDay,
      currentMonth: date.getMonth() === calDate.getMonth(),
      today: equalDate(calDate, date),
      day: calDate.getDate(),
      day2: calDate.getDate().toLocaleString('de-DE', digitOptions),
      date: calDate
    });
  }

  const prevMonth = new Date(year, monthIndex - 1,  1, 3); 
  const nextMonth = new Date(year, monthIndex + 1,  1, 3); 

  return { 
    prev: {
      label: LocalMonths[prevMonth.getMonth()],   
      year: prevMonth.getFullYear(),
      month: (prevMonth.getMonth() - 1).toLocaleString('de-DE', digitOptions)
    },
    next: {
      label: LocalMonths[nextMonth.getMonth()],
      year: nextMonth.getFullYear(), 
      month: (nextMonth.getMonth() + 1).toLocaleString('de-DE', digitOptions)
    },
    year: date.getFullYear(),
    month: LocalMonths[date.getMonth()],
    weeks: calMonth 
  }; 
};

