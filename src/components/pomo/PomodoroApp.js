import React, { useState, useEffect, useRef } from "react";
import BreakModes from "./BreakModes";
import Timer from "./Timer";
import Settings from "./Settings";
import logo from "../../assets/pomoassets/logo.svg";
import alarmSound from "../../assets/pomoassets/Justin Bieber - Stay Short Version.mp3";

function PomodoroApp() {
	/*
    STATES
  */
	const alarm = new Audio(alarmSound);
	const [durations, setDurations] = useState({
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
	});
	const [themeStyle, setThemeStyle] = useState({
		font: "'Kumbh Sans', Poppins, Monserat, 'Open Sans', Roboto, sans-serif ",
		color: "#f87070",
	});
	const [timerType, setTimerType] = useState(durations.pomodoro);
	const [timerRunning, setTimerRunning] = useState(false);
	const [buttonStatus, setButtonStatus] = useState("START");
	const [remainingTime, setRemainingTime] = useState(timerType * 60);
	const [timeInText, setTimeInText] = useState(formatTime(remainingTime));
	const intervalId = useRef(null);

	const [circumference, setCircumference] = useState(938.2554955505133);
	const [progressRingStyle, setProgressRingStyle] = useState({
		strokeDasharray: `${circumference} ${circumference}`,
		strokeDashoffset: `${circumference}`,
	});

	/*
    useEffect Hooks
  */
	useEffect(() => {
		setRemainingTime(timerType * 60);
		setTimeInText(formatTime(timerType * 60));
	}, [timerType, durations]);

	useEffect(() => {
		if (window.innerWidth <= 414) {
			setCircumference(752.5590953894741);
		} else {
			setCircumference(938.2554955505133);
		}
	}, []);

	/*
    USER CUSTOMIZATION
  */
	const updateTimerType = (event) => {
		setTimerType(event);
		if (timerRunning) {
			clearInterval(intervalId.current);
			setTimerRunning(false);
			setButtonStatus("START");
			progress(timerType * 60);
		}
	};
	const updateThemeStyle = (event) => {
		setThemeStyle(event);
	};
	const updateDurations = (event) => {
		setDurations(event);
		if (timerType === durations.pomodoro) {
			setTimerType(event.pomodoro);
		} else if (timerType === durations.shortBreak) {
			setTimerType(event.shortBreak);
		} else if (timerType === durations.longBreak) {
			setTimerType(event.longBreak);
		}
		setTimerRunning(false);
		clearInterval(intervalId.current);
		setButtonStatus("START");
		setRemainingTime(timerType * 60);
	};

	/*
    START AND STOP
  */
	const handleStartStop = () => {
		if (timerRunning) {
			clearInterval(intervalId.current);
			setButtonStatus("START");
			setTimerRunning(false);
		} else {
			const newIntervalId = setInterval(countdown, 1000);
			intervalId.current = newIntervalId;
			setButtonStatus("PAUSE");
			setTimerRunning(true);
		}
	};
	document.addEventListener("click", () => {
		alarm.pause();
		alarm.currentTime = 0;
	});

	/*
    HELPER FUNCTIONS
  */
	function formatTime(timeInSeconds) {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	}
	function countdown() {
		setRemainingTime((prevRemainingTime) => {
			if (prevRemainingTime <= 0) {
				clearInterval(intervalId.current);
				setTimerRunning(false);
				setButtonStatus("RESTART");
				alarm.play();
				return timerType * 60;
			}
			const newRemainingTime = prevRemainingTime - 1;
			setTimeInText(formatTime(newRemainingTime));
			progress(newRemainingTime);
			return newRemainingTime;
		});
	}
	function progress(timeInSeconds) {
		const durationInSeconds = timerType * 60;
		const percentage = circumference * (1 - timeInSeconds / durationInSeconds);
		const offset = circumference - (0.5*percentage);
		setProgressRingStyle({
			strokeDasharray: `${circumference}`,
			strokeDashoffset: `${offset}`,
			stroke: themeStyle.color,
		});
	}

	return (
		<div className="App">
			<div className="header">
				<h1>Focus Mode</h1>
				{/* <img src={logo} className="pomodoro-logo" alt="pomodoro-logo" /> */}
			</div>
			<div className="content">
				<BreakModes
					themeStyle={themeStyle}
					updateTimerType={updateTimerType}
					durations={durations}
				/>
				<Timer
					buttonStatus={buttonStatus}
					timeInText={timeInText}
					handleStartStop={handleStartStop}
					themeStyle={themeStyle}
					progressRingStyle={progressRingStyle}
				/>
				<Settings
					updateThemeStyle={updateThemeStyle}
					updateDurations={updateDurations}
				/>
			</div>
		</div>
	);
}

export default PomodoroApp;
