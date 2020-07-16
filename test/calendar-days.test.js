const tape = require('tape');
const calendarDays = require('../index');

tape (t => {
 
  const {weeks} = calendarDays();

  t.equals(weeks.length, 5, 'weeks'); 

  for (let i = 0, l = weeks.length; i < l; i++) {
    t.equals(weeks[i].length, 7, 'days'); 
  }

  t.end();

});
