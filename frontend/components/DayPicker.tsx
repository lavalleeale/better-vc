import { Card, IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const DayPicker = ({
  day,
  setDay,
}: {
  day: number;
  // eslint-disable-next-line no-unused-vars
  setDay(value: number): void;
}) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <Card className="card" style={{ textAlign: 'center' }}>
      <IconButton
        aria-label="Previous Day"
        onClick={() => {
          if (day === 0) {
            setDay(6);
          } else {
            setDay(day - 1);
          }
        }}
        style={{ marginRight: '10px' }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography style={{ display: 'inline' }}>
        {days[Math.abs(day)]}
      </Typography>
      <IconButton
        aria-label="Next Day"
        onClick={() => {
          if (day === 6) {
            setDay(0);
          } else {
            setDay(day + 1);
          }
        }}
        style={{ marginLeft: '10px' }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Card>
  );
};

export default DayPicker;
