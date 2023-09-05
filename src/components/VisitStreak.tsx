import './styles/VisitStreak.css';
import streakBg from '../assets/images/streakHexa.png';
import streak from '../assets/images/streak.png';


export const VisitStreak = () => {
    return (
        <div className='m-5'>
            <div className='visit-streak flex gap-[55px] items-center rounded-[10px] shadow-[0px_0px_7px_#00000059] px-[16px] py-[20px] w-fit'>
                <div className='flex flex-col gap-2'>
                    <div className='text-black text-xs font-medium leading-[18px]'>You have earned a new badge:
                        <span className='font-bold'>Daily Streaking</span></div>
                    <div className='text-black text-xs font-medium leading-[18px]'>You maintained a streak for {25} days</div>
                </div>
                <div className='relative'>
                    <img src={streakBg} alt="" style={{
                        WebkitFilter: 'drop-shadow(2px 2px 5px rgba(34, 34, 34, 0.65))',
                        filter: 'drop-shadow(2px 2px 5px rgba(34, 34, 34, 0.65))',
                    }} className='h-[58px]' />
                    <img src={streak} alt='' className='absolute top-[25%] w-[12.47px] h-[12.47px] left-[38%]' />
                    <span className='absolute text-white top-[65%] left-[38%] text-[12px]'>{25}</span>
                </div>
            </div>
        </div>
    );
};
