import React, { Component } from 'react';
import moment from 'moment';
import { isSameDate, isDisabled } from './utils/utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function calculateColor(fare) {
  const maxFare = 500;
  const ratio = Math.min(fare, maxFare) / maxFare;
  const hue = 120; // Green hue starts at 120
  const saturation = 100 * ratio; // Saturation transition
  const lightness = 100 - 50 * ratio; // Lightness transition from white to green
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`; // With opacity
}

function DaySummaryComponent({ daySummary }) {
  return (
    <div className="p-7 text-sm flex flex-col items-start">
      <p>Trips: <b>{daySummary["numberOfTrips"]}</b> trips</p>
      <p>Earnings: <b>${daySummary["sumFares"].toFixed(2)}</b></p>
      <p>Time driving passengers: <b>{(daySummary["sumDurations"] / 60).toFixed(2)} </b> minutes</p>
      <p>Fare per minute: <b>${(daySummary["sumFares"] / daySummary["sumDurations"] * 60).toFixed(2)}</b></p>
      <div className="flex self-center justify-self-center p-2">
        <DayTripBreakdown daySummary={daySummary}></DayTripBreakdown>
      </div>
    </div>
  );
}

function convertToAmPm(hour) {
  // Validate the input to ensure it's within the expected range
  if (hour < 0 || hour > 23) {
    return 'Invalid hour';
  }

  // Determine the suffix and adjust hours for 12-hour format
  const suffix = hour < 12 ? 'AM' : 'PM';
  let hourIn12 = hour % 12;

  // Adjust the hour since 0 should be converted to 12 for 12-hour format
  if (hourIn12 === 0) {
    hourIn12 = 12;
  }

  return `${hourIn12} ${suffix}`;
}



function DayTripBreakdown({ daySummary }) {
  const tripTimes = daySummary['tripTimes'];

  const getColorAndWeight = (numTrips) => {
    const ratio = numTrips / 6;
    const hue = 120 * (1 - ratio); // Example: color shifts from green to red
    return {
      color: `hsl(${hue}, 100%, 40%)`,
      fontWeight: 'bold'
    };
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="text-xs px-2">Time</th>
          <th className="text-xs px-2">Trips</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(tripTimes).map((time) => {
          const style = getColorAndWeight(tripTimes[time]);
          return (
            <tr key={time}>
              <td className="text-xs px-2">{convertToAmPm(Number(time))}</td>
              <td className="text-xs px-2" style={style}>
                {tripTimes[time]} trips
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


export default class ScrollCalendar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null
    };

    this.handleSelectedDate = this.handleSelectedDate.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  handleSelectedDate(e, value) {
    e && e.preventDefault();
    this.setSelectedDate(value);
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  setSelectedDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  componentDidMount() {
    this.setSelectedDate(this.props.selectedDate);
    let element = document.getElementById(
      moment(this.props.selectedDate, 'DD/MMM/YYYY').format('MMMM-YYYY')
    );
    if (element) {
      element.scrollIntoView();
    }
  }

  componentWillReceiveProps(props) {
    if (props.selectedDate) {
      this.setSelectedDate(props.selectedDate);
    }
  }

  render() {
    let props = {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      selectedDate: this.state.selectedDate,
      handleSelect: this.handleSelectedDate,
      className: this.props.className + ' mobile-datepicker',
      yearFormat: this.props.yearFormat,
      monthFormat: this.props.monthFormat,
      enableYearTitle: this.props.enableYearTitle,
      enableMonthTitle: this.props.enableMonthTitle,
      data: this.props.data,  // Pass the data down through props
    };
    return (
      <RenderCalendarYear {...props} />
    );
  }
}

export const RenderCalendarYear = props => {
  let { minDate, maxDate } = props;
  let totalMonth = Math.round(maxDate.diff(minDate, 'months', true)) + 1;
  let now = moment(minDate, 'DD/MMM/YYYY');
  let elements = [];
  for (let i = 0; i < totalMonth; i++) {
    elements.push(
      <RenderMonthCard key={i} currentMonth={now.clone()} {...props} />
    );
    now = now.add(1, 'M');
  }
  return (
    <div className={props.className}>
      {elements}
    </div>
  );
};

export const RenderMonthCard = props => {
  let now = props.currentMonth;
  return (
    <section className="month" id={now.format('MMMM-YYYY')}>
      <RenderMonthHeader date={now} {...props} />
      <RenderDayHeader />
      <RenderDays date={now} {...props} />
    </section>
  );
};

export const RenderMonthHeader = props => {
  let month = props.date.format(props.monthFormat);
  let year = props.date.format(props.yearFormat);
  return (
    <p className="month-title">
      {props.enableYearTitle ? <span>{year}</span> : null}
      {props.enableMonthTitle ? month : null}
    </p>
  );
};

export const RenderDayHeader = () => {
  return (
    <ul className="days">
      <li key={'Sunday'}>Su</li>
      <li key={'Monday'}>Mo</li>
      <li key={'Tuesday'}>Tu</li>
      <li key={'Wednesday'}>We</li>
      <li key={'Thursday'}>Th</li>
      <li key={'Friday'}>Fr</li>
      <li key={'Saturday'}>Sa</li>
    </ul>
  );
};

export const RenderSingleDay = ({
  isActive,
  handleClick,
  currentValue,
  isDisabled,
  data,
  i
}) => {
  const daySummary = data[currentValue.format("yyyy-MM-DD")];
  const backgroundColor = daySummary
    ? calculateColor(daySummary["sumFares"])
    : "transparent";

  let className = `${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''} popover-trigger`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <li className={className} key={i}>
          <span style={{
            display: 'inline-block',
            width: '32px',
            height: '32px',
            lineHeight: '32px',
            backgroundColor,
            borderRadius: '50%',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            {currentValue.date()}
          </span>
        </li>
      </PopoverTrigger>
      <PopoverContent className="popover-content">
        {daySummary ? (
          <DaySummaryComponent daySummary={daySummary} />
        ) : (
          "No Rides Found"
        )}
      </PopoverContent>
    </Popover>
  );
};

export const RenderDays = ({
  date,
  selectedDate,
  handleSelect,
  minDate,
  maxDate,
  data
}) => {
  let daysInMonth = date.daysInMonth();
  let startDate = date.startOf('month');
  let balanceDayCount = startDate.day();

  let renderDay = () => {
    let elements = [];
    let now = moment(date, 'DD/MMM/YYYY');
    for (let i = 1; i <= daysInMonth; i++) {
      elements.push(
        <RenderSingleDay
          isActive={isSameDate(now.clone(), selectedDate)}
          isDisabled={isDisabled(minDate, now.clone(), maxDate)}
          handleClick={handleSelect}
          currentValue={now.clone()}
          data={data}
          key={i}
        />
      );
      now = now.add(1, 'days');
    }
    return elements;
  };
  let renderUnwantedDay = balanceDayCount => {
    let elements = [];
    for (let i = 0; i < balanceDayCount; i++) {
      elements.push(<li className="visible-hidden" key={i} />);
    }
    return elements;
  };
  return (
    <ul className="date">
      {renderUnwantedDay(balanceDayCount)}
      {renderDay()}
    </ul>
  );
};

ScrollCalendar.defaultProps = {
  minDate: moment().subtract(2, 'Y'),
  maxDate: moment().subtract(1, 'Y'),
  selectedDate: null,
  monthFormat: 'MMMM',
  yearFormat: 'YYYY',
  enableYearTitle: true,
  enableMonthTitle: true
};
