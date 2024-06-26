import './VisitStreak.css';
import streakBg from '../../assets/images/streakHexa.png';
import streak from '../../assets/images/streak.png';


const VisitStreak = ({days=0,color="black",backgroundColor="white"}) => {
    return (
        <div className='m-5' >
            <div className='q-streak-main' style={{color,backgroundColor}}>
                <div className='q-streak-div'>
                    <div className='q-streak-badge' style={{color,backgroundColor}}>You have earned a new badge
                       Daily Streaking</div>
                    <div className='q-streak-text' style={{color,backgroundColor}}>You maintained a streak
                        for {days} days
                    </div>
                </div>
                <div style={{position: "relative"}}>
                    <img src={streakBg} alt=""  className='q-streak-img'/>
                    <img src={streak} alt='' className='q-streak-simg'/>
                    <div style={{display: "inline"}} className='q-streak-count'>{days}</div>
                </div>
            </div>
        </div>
    );
};

export default VisitStreak