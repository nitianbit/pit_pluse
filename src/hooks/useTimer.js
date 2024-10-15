import { useState, useRef, useEffect } from 'react';

const useTimer = ({ duration = 0, durationCovered = 0, onComplete, paused = false }) => {
  const initialTimeLeft = duration - durationCovered; // Calculate initial time left
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false); // To track if the timer is running or paused
  const intervalRef = useRef(null); // Store the interval reference

  // Update timeLeft when duration or durationCovered changes
  useEffect(() => {
    const newTimeLeft = duration - durationCovered;
    setTimeLeft(newTimeLeft);
  }, [duration, durationCovered]);

  // Manage timer start/pause based on `paused` prop
  useEffect(() => {
    if (paused) {
      pauseTimer(); // If paused, pause the timer
    } else if (!isRunning && timeLeft > 0) {
      startTimer(); // If not paused and time left, start the timer
    }
  }, [paused, isRunning, timeLeft]);

  // Start the timer
  const startTimer = () => {
    console.log("starting....")
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement the time left
          } else {
            clearInterval(intervalRef.current); // Stop the timer when it reaches 0
            setIsRunning(false);
            if (onComplete) onComplete(); // Callback when timer completes
            return 0;
          }
        });
      }, 1000); // Decrement every second
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current); // Clear the interval
      setIsRunning(false); // Set running status to false
    }
  };

  // Reset the timer
  const resetTimer = (newDuration, newDurationCovered = 0) => {
    clearInterval(intervalRef.current); // Clear the interval
    const resetTimeLeft = newDuration - newDurationCovered; // Recalculate remaining time
    setTimeLeft(resetTimeLeft); // Reset to the new time left
    setIsRunning(false); // Set running status to false
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Clear the interval on unmount
  }, []);

  return { timeLeft, isRunning, startTimer, pauseTimer, resetTimer };
};

export default useTimer;
