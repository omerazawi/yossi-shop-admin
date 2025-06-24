import React from 'react';
import './Home.css';
import ClockWithGreeting from '../../components/Clock/Clock';
import Chart from '../../components/Chart/Chart';


export default function Home() {
  return (
    <div className='home'>
        <ClockWithGreeting />
        <div className="home-panel">
          <div className="chart-container">
<Chart />
<div className="chart-list">
<ul>
      <li>משלוחים</li>
      <li>איסוף עצמי</li>
      <li>בהמתנה</li>
    </ul>
</div>
            </div>  
        </div>
    </div>
  )
}
