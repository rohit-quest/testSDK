import {HelperProps} from 'tour-navigator/lib/TourNavigator/types'
import './tourHelper.css'
import { CSSProperties } from 'react'

interface TourHelperProps extends HelperProps {
    headerStyle?: CSSProperties;
    descriptionStyle?: CSSProperties;
    helperBackgroundStyle?: CSSProperties;
    helperStyle?: CSSProperties;
    footerStyle?: CSSProperties;
    firstButtonStyle?: CSSProperties;
    lastButtonStyle?: CSSProperties;
    imgStyle?: CSSProperties,
    onComplete?: () => void
}
export default function TourHelper({
    steps, 
    currentStep, 
    currentStepIndex, 
    prev, 
    next,
    headerStyle,
    descriptionStyle,
    helperBackgroundStyle,
    helperStyle,
    footerStyle,
    firstButtonStyle,
    lastButtonStyle,
    imgStyle,
    onComplete
}: TourHelperProps) {

    const isFirst = currentStepIndex == 0
    const isLast = currentStepIndex == (steps.length - 1)

  const handleNext = () => {
    if(isLast) return onComplete?.()
    next()
  }
  return (
    <div className='tour-helper' style={{
        ...helperStyle
    }}>
        <div className='tour-image'>
            <div 
                className='tour-background'
                style={{
                    ...helperBackgroundStyle
                }}
            >
                <div /><div /><div />
            </div>
            {
                currentStep?.data?.image ? <img src={currentStep.data?.image} style={imgStyle} />:null
            }
            <div className='tour-back-btn' onClick={prev}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02018 3.64645C7.21544 3.84171 7.21544 4.15829 7.02018 4.35355L3.87373 7.5H13.3333C13.6094 7.5 13.8333 7.72386 13.8333 8C13.8333 8.27614 13.6094 8.5 13.3333 8.5H3.87373L7.02018 11.6464C7.21544 11.8417 7.21544 12.1583 7.02018 12.3536C6.82492 12.5488 6.50833 12.5488 6.31307 12.3536L2.31307 8.35355C2.11781 8.15829 2.11781 7.84171 2.31307 7.64645L6.31307 3.64645C6.50833 3.45118 6.82492 3.45118 7.02018 3.64645Z" fill="#939393"/>
                </svg>
            </div>
        </div>
        <div className='tour-content'>
            <div className='tour-content-info'>
                <small>{currentStepIndex+1}/{steps.length}</small>
            </div>
            <h3 
                className='tour-content-title'
                style={{
                    ...headerStyle
                }}
            >
                {currentStep?.data.title}
            </h3>
            <p 
                className='tour-content-description'
                style={{
                    ...descriptionStyle
                }}
            >
                {currentStep?.data.description}
            </p>
            <div className='tour-content-actions'>
                {
                    isFirst ? null:<button onClick={prev} style={{...firstButtonStyle}}>Back</button>
                }
                <button onClick={handleNext} style={{...lastButtonStyle}}>{isLast ? 'Get Started':'Continue'}</button>
            </div>
        </div>
        <div className='tour-watermark' style={footerStyle}>
            <small>Powered by Quest Labs</small>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z" fill="#B9B9B9"/>
            <path d="M12 8L8 8L8 12H12V8Z" fill="#B9B9B9"/>
            </svg>
        </div>
    </div>
  )
}
