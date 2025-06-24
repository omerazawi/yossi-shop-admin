import React, { useState, useEffect } from "react";
import './Clock.css';

const ClockWithGreeting = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("בוקר טוב");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("צהריים טובים");
    } else {
      setGreeting("ערב טוב");
    }
  }, [time]);

  return (
    <div className="clock">
      <p>{greeting}, יוסי</p>
      <p>{time.toLocaleTimeString("he-IL", { timeZone: "Asia/Jerusalem" })}</p>
    </div>
  );
};

export default ClockWithGreeting;
