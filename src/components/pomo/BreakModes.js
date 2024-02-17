import { useEffect, useState } from "react";

const BreakModes = (props) => {
    //Props
    const themeStyle = props.themeStyle;
    const timerType = props.updateTimerType;
    const durations = props.durations;

    //States
    const [selectedMode, setSelectedMode] = useState('pomodoro');

    useEffect((()=>{
        //Invoke CSS to set a variable which stores themestyle color, 
        //when themeStyle.color changes, update the selected mode bg
        document.documentElement.style.setProperty("--selected-mode-bg", themeStyle.color);
    }), [themeStyle.color])

    const handleRadioChange = (event) => {
        const mode = event.target.value;
        setSelectedMode(mode);
        timerType(durations[mode]);
    }
    
    return ( 
        <div className="break-modes" style={{fontFamily: themeStyle.font}}>
            <div className="pill">
                <label>
                    <input type="radio" id="pomodoro" value="pomodoro" className="break-mode-btn" name="timer-type"
                    onChange={handleRadioChange} checked={selectedMode === 'pomodoro'}/>
                    <span style={{backgroundColor: selectedMode === 'pomodoro' ? themeStyle.color : '#161932'}}
                    >Focus Mode</span>
                </label>
            </div>
            <div className="pill">
                <label>
                    <input type="radio" id="shortbreak" value="shortBreak" className="break-mode-btn" name="timer-type"
                    onChange={handleRadioChange} checked={selectedMode === 'shortBreak'}/>
                    <span style={{backgroundColor: selectedMode === 'shortBreak' ? themeStyle.color : '#161932'}}
                    >short break</span>
                </label>
            </div>
            <div className="pill">
                <label>
                    <input type="radio" id="longbreak" value="longBreak" className="break-mode-btn" name="timer-type"
                    onChange={handleRadioChange} checked={selectedMode === 'longBreak'}/>
                    <span style={{backgroundColor: selectedMode === 'longBreak' ? themeStyle.color : '#161932'}}
                    >long break</span>
                </label>
            </div>
        </div>
     );
}
 
export default BreakModes;