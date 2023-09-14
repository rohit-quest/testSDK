import './VisitStreak.css';
import streakBg from '../assets/images/streakHexa.png';
import streak from '../assets/images/streak.png';


export const VisitStreak = () => {
    return (
        <div className='m-5'>
            <div className='q-streak-main'>
                <div className='q-streak-div'>
                    <div className='q-streak-badge'>You have earned a new badge:
                        <span style={{fontWeight: 700}}>Daily Streaking</span></div>
                    <div className='q-streak-text'>You maintained a streak
                        for {25} days
                    </div>
                </div>
                <div style={{position: "relative"}}>
                    <img src={streakBg} alt=""  className='q-streak-img'/>
                    <img src={streak} alt='' className='q-streak-simg'/>
                    <span className='q-streak-count'>{25}</span>
                </div>
            </div>
        </div>
    );
};
