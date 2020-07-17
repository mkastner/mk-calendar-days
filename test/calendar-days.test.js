const tape = require('tape');
const calendarDays = require('../index');

tape (t => {
 
  const {weeks, months, weekDays} = calendarDays();

  t.equals(weeks.length, 5, 'weeks'); 

  for (let i = 0, l = weeks.length; i < l; i++) {
    t.equals(weeks[i].length, 7, 'days'); 
  }

  t.equals(months.length, 12, 'months'); 

  t.equals(weekDays.length, 7, 'weekdays'); 

  t.end();

});
