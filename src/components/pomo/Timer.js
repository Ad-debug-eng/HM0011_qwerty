const Timer = ( props ) => {
    //Props
    const { buttonStatus, timeInText,
        handleStartStop, progressRingStyle, themeStyle
    } = props;
    const style = {
        strokeDasharray: progressRingStyle.strokeDasharray,
        strokeDashoffset: progressRingStyle.strokeDashoffset,
        stroke: themeStyle.color
    }

    return ( 
        <div className="timer">
            <svg className="timer-circle" width="480" height="480">
                <defs>
                    <filter id="blur-filter">
                    <feGaussianBlur stdDeviation="20" />
                    </filter>
                </defs>
                <circle className="bg-blur" cx="44%" cy="30%" r="27.56%" fill="#393e74" filter="url(#blur-filter)" />
                <circle id="circ1" className="outer-circle" cx="43%" cy="30%" r="25.78%" fill="#242747"/>
                <circle id="circ2" className="inner-circle" cx="43%" cy="30%" r="21.78%" fill="#161932"/>
                <circle id="circ3" className="progress-ring" cx="70%" cy="43%" r="17.11%" strokeWidth="15" fill="#161932" style={style} />
                <text className="timer-text" 
                    x="43%" y="28%" textAnchor="middle" fontSize="33" fontWeight="700" fill="#EFF1FA" style={{fontFamily: themeStyle.font}}
                >
                    {timeInText}
                </text>
                <text className="start-stop"
                    fill="#EFF1FA" fontSize="22" x="44%" y="39%" textAnchor="middle" fontWeight="600" style={{fontFamily: themeStyle.font}} letterSpacing="0.3rem"
                    onClick={handleStartStop}
                >
                    {buttonStatus}
                </text>
            </svg>
        </div>
     );
}
 
export default Timer;