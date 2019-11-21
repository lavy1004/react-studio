import React from 'react';


class DaysOfMonth extends React.Component {

    firstWeekdayOfMonth(Year, Month) {
      var theDate = new Date(Year, Month, 1);
  
      switch (theDate.getDay()) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        default:
          return "Saturday";
      }
    }
    render() {
      const month = this.props.monthData;
      const firstDayOfMonth = this.firstWeekdayOfMonth(
        2017, month.id
      ).toLowerCase();
      
      let daysCollection = [];
      let i = 1;
      let numberOfDays = month.numberOfDays;
      while (i <= numberOfDays) {
        daysCollection.push(
          <span
            className={
              "day-of-month " + (i === 1 ? "first-day-" + firstDayOfMonth : null)
            }
          >
            {i}
          </span>
        );
        i++;
      }
  
      return (
        <div>
          {daysCollection}
        </div>
      );
    }
} 

export default DaysOfMonth
