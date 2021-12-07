import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ dropDate }) => {
  // State
  const [timerString, setTimerString] = useState("");

  // useEffect will run on component load
  useEffect(() => {
    console.log("Setting interval...");

    // Use setInterval to run this piece of code every second
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      // Here it's as easy as doing some time math to get the different properties
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Set the desired input in state
      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // If the distance passes zero - it's drop time
      if (distance < 0) {
        console.log("Clearing interval...");
        clearInterval(interval);
      }
    }, 1000);

    // Anytime the component unmounts, clean up the interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="timer-container">
      <p className="timer-header">Shark Drop starting in:</p>
      {timerString && (
        <p className="timer-value">
          <strong>{`⏰ ${timerString}`}</strong>
        </p>
      )}
    </div>
  );
};

export default CountdownTimer;
