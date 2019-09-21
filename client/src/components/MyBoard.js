import React from "react";


class Test extends React.Component {
  state = {
    selectedDate: null
  };

  componentDidMount() {
    this.setDate();
  }

  setDate = (newDate) => {
    const date = newDate || new Date();
    this.setState({
      selectedDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    });
  };

  getPreviousDate = () => {
    const { selectedDate } = this.state

    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli)

    this.setDate(previousDate)

  }

  getNextDate = () => {
    const { selectedDate } = this.state

    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli)

    this.setDate(nextDate)

  }

  render() {
    return (
      <div>
        <h3>Date: {this.state.selectedDate}</h3>
        <button onClick={this.getPreviousDate}>Previous</button>
        <button onClick={this.getNextDate}>Next</button>
      </div>
    );
  }
}

export default Test