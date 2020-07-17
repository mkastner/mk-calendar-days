function equalDate(dateA, dateB) {
  return dateA.getYear === dateB.getYear 
    && dateA.getMonth() === dateB.getMonth() 
    && dateA.getDate() === dateB.getDate(); 
}

function getMonths(givenDate) {
  const date = givenDate || new Date();
  const result = []; 
  for ( let i = 0; i <= 11; i++) {
    let d = new Date(date.getFullYear(), i, 1, 3); 

    result.push({
      selected: date ? ( date.getMonth() === d.getMonth() ) : false, 
      long: d.toLocaleString('de-DE', {month: 'long'}),
      short: d.toLocaleString('de-DE', {month: 'short'})
    }); 
  }

  return result;
}

function getWeekDays(givenDate) {
  let dateWeekStart;
  const now = new Date();
  // get first beginning of new week
  for (let i = 1; i <= 7; i++) {
    dateWeekStart = new Date(now.getFullYear(), now.getMonth(), i);

    if (dateWeekStart.getDay() === 0) {
      break; 
    }
  }   
  // English/American weeks start at 0 i.e. sunday
  // so counting starts one off
  const result = []; 
  for ( let i = 1; i <= 7; i++) {
    let weekDay = new Date(
      dateWeekStart.getFullYear(), 
      dateWeekStart.getMonth(),
      dateWeekStart.getDate() + i,
      3
    );

    // this is where the day is pushed on the week
    result.push({
      selected: givenDate ? ( givenDate.getDay() === weekDay.getDay() ) : false, 
      long: weekDay.toLocaleString('de-DE', {weekday: 'long'}),
      short: weekDay.toLocaleString('de-DE', {weekday: 'short'})
    }); 
  }

  return result;
}

module.exports = function calendarDays (dateArg, optionArgs) {

  const options = Object.assign({
    yearsStyle: 'short',
    yearsFrom: new Date().getFullYear() - 5,
    yearsThrough: new Date().getFullYear() + 5,
    monthsStyle: 'short'
  }, optionArgs);

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
      currentDay: equalDate(calDate, date),
      day: calDate.getDate(),
      day2: calDate.getDate().toLocaleString('de-DE', digitOptions),
      date: calDate
    });
  }

  const prevMonth = new Date(year, monthIndex - 1,  1, 3); 
  const nextMonth = new Date(year, monthIndex + 1,  1, 3); 

  return { 
    prevMonth: {
      year: prevMonth.getFullYear(),
      short: prevMonth.toLocaleString('de-DE', {month: 'short'}),
      long: prevMonth.toLocaleString('de-DE', {month: 'long'})
    },
    months: getMonths(),
    nextMonth: {
      year: nextMonth.getFullYear(),
      short: nextMonth.toLocaleString('de-DE', {month: 'short'}), 
      long: nextMonth.toLocaleString('de-DE', {month: 'long'}) 
    },
    year: date.getFullYear(),
    weekDays: getWeekDays(date), 
    weekDay: {
      short: date.toLocaleString('de-DE', {weekday: 'short'}), 
      long: date.toLocaleString('de-DE', {weekday: 'long'}) 
    },  
    month: { 
      year: date.getFullYear(),
      short: date.toLocaleString('de-DE', {month: 'short'}), 
      long: date.toLocaleString('de-DE', {month: 'long'}) 
    }, 
    weeks: calMonth 
  }; 
};

