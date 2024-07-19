import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
      audioRef.current.play();
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(sessionLength * 60 - 1);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(sessionLength * 60 + 1);
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="App">
      <div className="background">
        <div className="container">
          <h1>25 + 5 Clock</h1>
          <div className="length-control">
            <label id="break-label">Break Length</label>
            <button id="break-decrement" onClick={handleBreakDecrement}>
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={handleBreakIncrement}>
              +
            </button>
          </div>
          <div className="length-control">
            <label id="session-label">Session Length</label>
            <button id="session-decrement" onClick={handleSessionDecrement}>
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={handleSessionIncrement}>
              +
            </button>
          </div>
          <div className="timer">
            <span id="timer-label">{timerLabel}</span>
            <span id="time-left">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
            </span>
          </div>
          <button id="start_stop" onClick={handleStartStop}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button id="reset" onClick={handleReset}>
            Reset
          </button>
          <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        </div>
      </div>
    </div>
  );
}

export default App;