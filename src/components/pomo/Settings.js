import { useState } from "react";
import settingsIcon from '../../assets/pomoassets/icon-settings.svg';

const Settings = (props) => {
    //styles
    const colors = {
        red: "#F87070",
        blue: "#70f3f8",
        purple: "#D881F8"
    }
    const fonts = {
        kumbhSans: "'Kumbh Sans', Poppins, Monserat, 'Open Sans', Roboto, sans-serif",
        robotoSlab: "'Roboto Slab', Lora, Merriweather, 'PT Serif', Arvo, 'Playfair Display', 'Noto serif'",
        spaceMono: "'Space Mono', 'IBM Plex Mono', 'Fira Mono', 'Anonymous Pro', monospace" 
    }
    //States
    const [ menuDisplay, setMenuDisplay ] = useState(false);
    const [ bgColorKumbhSans, setBgColorKumbhSans ] = useState('#1E213F');
    const [ bgColorRobotoSlab, setBgColorRobotoSlab ] = useState('buttonface');
    const [ bgColorSpaceMono, setBgColorSpaceMono ] = useState('buttonface');
    const [ fontColorKumbhSans, setFontColorKumbhSans ] = useState('#fff');
    const [ fontColorRobotoSlab, setFontColorRobotoSlab ] = useState('#1E213F');
    const [ fontColorSpaceMono, setFontColorSpaceMono ] = useState('#1E213F');
    const [ checkMarkRed, setCheckMarkRed ] = useState({opacity: "1"});
    const [ checMarkBLue, setCheckMarkBlue ] = useState({opacity: "0"});
    const [ checkMarkPurple, setCheckMarkPurple ] = useState({opacity: "0"});
    //Final States
    const [ selectedColor, setSelectedColor ] = useState(colors.red);
    const [ selectedFont, setSelectedFont ] = useState(fonts.kumbhSans);
    const [ pomodoro, setPomodoro ] = useState(25);
    const [ longBreak, setLongBreak ] = useState(15);
    const [ shortBreak, setShortBreak ] = useState(5);
    const [ isApplying, setIsApplying ] = useState(false);

    const toggleDisplay = () =>{
        setMenuDisplay(prevMenudisplay => !prevMenudisplay);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        //setMenuDisplay(prevMenudisplay => !prevMenudisplay);
        const finalSelectedColor = selectedColor;
        const finalSelectedFont = selectedFont;
        const finalSelectedTime = {
            pomodoro: parseFloat(pomodoro),
            shortBreak: parseFloat(shortBreak),
            longBreak: parseFloat(longBreak)
        }
        console.log(pomodoro, shortBreak, longBreak);
        props.updateDurations(finalSelectedTime);
        props.updateThemeStyle({
            font: finalSelectedFont,
            color: finalSelectedColor
        })
        setIsApplying(true);
        setTimeout((()=>{
            setIsApplying(false);
            setMenuDisplay(prevMenudisplay => !prevMenudisplay);
        }), 2000)
    }
    const handleFontRadioChange = (e) =>{
        //Reset all colors
        setBgColorKumbhSans('buttonface');
        setBgColorRobotoSlab('buttonface');
        setBgColorSpaceMono('buttonface');
        setFontColorKumbhSans('#1E213F');
        setFontColorRobotoSlab('#1E213F');
        setFontColorSpaceMono('#1E213F');

        //Set color for checked radio button
        switch (e.target.value) {
            case fonts.kumbhSans:
                setBgColorKumbhSans("#1E213F");
                setFontColorKumbhSans("#fff");
                setSelectedFont(fonts.kumbhSans);
                break;
            case fonts.robotoSlab:
                setBgColorRobotoSlab("#1E213F");
                setFontColorRobotoSlab("#fff");
                setSelectedFont(fonts.robotoSlab);
                break;
            case fonts.spaceMono:
                setBgColorSpaceMono("#1E213F");
                setFontColorSpaceMono("#fff");
                setSelectedFont(fonts.spaceMono);
                break;
            default:
                break;
        }
    }
    const handleColorRadioChange = (e) =>{
        //Reset
        setCheckMarkRed({opacity: "0"});
        setCheckMarkBlue({opacity: "0"});
        setCheckMarkPurple({opacity: "0"});

        //Set opacity for checked radio button
        switch(e.target.value){
            case colors.red:
                setCheckMarkRed({opacity: "1"});
                setSelectedColor(colors.red);
                break;
            case colors.blue:
                setCheckMarkBlue({opacity: "1"});
                setSelectedColor(colors.blue);
                break;
            case colors.purple:
                setCheckMarkPurple({opacity: "1"});
                setSelectedColor(colors.purple);
                break;
            default:
                break;
        }
    }

    return ( 
        <section className="settings-section">
            {!menuDisplay && <div className="settings-button">
                <img src={settingsIcon} onClick={toggleDisplay} alt="settings icon" />
            </div>}
            {menuDisplay && <div className="settings-menu">
                <div className="settings-header">
                    <h2>Settings</h2>
                    <div className="close-button" height="14" width="14">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleDisplay} width="14" height="14">
                            <path fill="#1E213F" fillRule="evenodd" d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z" opacity=".5"/>
                        </svg>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>TIME (MINUTES)</h2>
                    <div className="custom-time">
                        <div>
                            <label>Focus Mode</label>
                            <input type="number" 
                                value={pomodoro} onChange={(e)=>setPomodoro(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>short break</label>
                            <input type="number"
                                value={shortBreak} onChange={(e)=>setShortBreak(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>long break</label>
                            <input type="number" 
                                value={longBreak} onChange={(e)=>setLongBreak(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="custom-font">
                        <label>FONT</label>
                        <div className="radios">
                            <div className="kumbh-sans" style={{backgroundColor: bgColorKumbhSans}}>
                                <label>
                                    <input type="radio" name="font-type" onChange={handleFontRadioChange} value={fonts.kumbhSans} className="font-style-button" defaultChecked/>
                                    <span style={{color: fontColorKumbhSans, fontFamily: "'Kumbh Sans', Poppins, Monserat, 'Open Sans', Roboto, sans-serif"}}
                                    >Aa</span>
                                </label>
                            </div>
                            <div className="roboto-slab" style={{backgroundColor: bgColorRobotoSlab}}>
                                <label>
                                    <input type="radio" name="font-type" onChange={handleFontRadioChange} value={fonts.robotoSlab} className="font-style-button"/>
                                    <span   style={{color: fontColorRobotoSlab, fontFamily: "'Roboto Slab', Lora, Merriweather, 'PT Serif', Arvo, 'Playfair Display', 'Noto serif'"}}
                                    >Aa</span>
                                </label>
                            </div>
                            <div className="space-mono" style={{backgroundColor: bgColorSpaceMono}}>
                                <label>
                                    <input type="radio" name="font-type" onChange={handleFontRadioChange} value={fonts.spaceMono} className="font-style-button"/>
                                    <span   style={{color: fontColorSpaceMono, fontFamily: "'Space Mono', 'IBM Plex Mono', 'Fira Mono', 'Anonymous Pro', monospace"}}
                                    >Aa</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="custom-color">
                        <label>COLOR</label>
                        <div className="radios">
                            <div className="red" style={{backgroundColor: colors.red}}>
                                <label>
                                    <input type="radio" name="color-type" value={colors.red} onChange={handleColorRadioChange} className="color-button" defaultChecked/>
                                    <span>
                                        <svg className="checkmark-icon" style={checkMarkRed} viewBox="0 0 24 24">
                                            <path d="M5.293 11.293L9 15l9-9-1.414-1.414L9 12.172l-3.293-3.293-1.414 1.414z" />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                            <div className="blue" style={{backgroundColor: colors.blue}}>
                                <label>
                                    <input type="radio" name="color-type" value={colors.blue} onChange={handleColorRadioChange} className="color-button"/>
                                    <span>
                                        <svg className="checkmark-icon" style={checMarkBLue} viewBox="0 0 24 24">
                                            <path d="M5.293 11.293L9 15l9-9-1.414-1.414L9 12.172l-3.293-3.293-1.414 1.414z" />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                            <div className="purple" style={{backgroundColor: colors.purple}}>
                                <label>
                                    <input type="radio" name="color-type" value={colors.purple} onChange={handleColorRadioChange} className="color-button"/>
                                    <span>
                                        <svg className="checkmark-icon" style={checkMarkPurple} viewBox="0 0 24 24">
                                            <path d="M5.293 11.293L9 15l9-9-1.414-1.414L9 12.172l-3.293-3.293-1.414 1.414z" />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {!isApplying && <button>Apply</button>}
                    {isApplying && <button>Applying...</button>}
                </form>    
            </div>}
        </section>
     );
}
 
export default Settings;