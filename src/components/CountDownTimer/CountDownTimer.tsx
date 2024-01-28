import moment from "moment";
import { useEffect, useState } from "react";

type CountDownProps = {
  eventTime: number;
};

const CountDownTimer = (props: CountDownProps) => {
  const calculateTimeLeft = () => {
    let currentTime = Math.floor(Date.now() / 1000);
    let leftTime = props.eventTime - currentTime;
    let duration = moment.duration(leftTime, "seconds");
    let interval = 1000;
    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
      //window.location.reload(true); //#skip the cache and reload the page from the server
    }
    duration = moment.duration(duration.asSeconds() - 1, "seconds");
    return (
      duration.days() +
      " Days, " +
      duration.hours() +
      " Hours, " +
      duration.minutes() +
      " Minutes, " +
      duration.seconds() +
      " Seconds"
    );
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return <span>{timeLeft}</span>;
};
export default CountDownTimer;
