import React from "react";
import { observer } from 'mobx-react';

@observer
class DaysOfWeek extends React.Component {
  render() {
    return (
      <div className="weekdays">
        <span className='day-of-week'>
          Sunday
        </span>
        <span className='day-of-week'>
          Monday
        </span>
        <span className='day-of-week'>
          Tuesday
        </span>
        <span className='day-of-week'>
          Wednesday
        </span>
        <span className='day-of-week'>
          Thursday
        </span>
        <span className='day-of-week'>
          Friday
        </span>
        <span className='day-of-week'>
          Saturday
        </span>
      </div>
    )
  }
}

export default DaysOfWeek