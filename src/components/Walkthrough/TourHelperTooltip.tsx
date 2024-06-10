import { useState } from 'react'
import { TourHelperProps } from './types'
import { HelperProps } from 'tour-navigator/lib/TourNavigator/types'

export default function TourHelperTooltip({
  hideArrow,
  arrowStyle,
  helperStyle,
  helperBackgroundStyle,
  firstButtonStyle,
  lastButtonStyle,
  headerStyle,
  descriptionStyle,
  onComplete,
  handleFirstButtonClick,
  handleLastButtonClick,
  currentStep,
  onRequestClose,
  next,
  currentStepIndex,
  steps,
  ...props
}: TourHelperProps) {

  const helperProps: HelperProps = {
    currentStep,
    onRequestClose,
    next,
    currentStepIndex,
    steps,
    ...props
  }

  const isFirst = currentStepIndex == 0
  const isLast = currentStepIndex == (steps.length - 1)

  const handleNext = () => {
    if(isLast) return onComplete?.()
    next()
  }

  return (
    <div className='tour-helper-tooltip'>
      {
        hideArrow ? null:<div className='tour-helper-tooltip-pointer' style={arrowStyle}/>
      }
      <div className='tour-helper-content' style={{...helperBackgroundStyle, ...helperStyle}}>
        <div className={`tour-helper-tooltip-details`} >
          <h1 style={headerStyle}>{currentStep?.data?.title}</h1>
          <p style={descriptionStyle}>{currentStep?.data?.description}</p>
        </div>
        <div className="tour-helper-tooltip-button">
          {
            !isLast && (
              <button className='tour-helper-button transparent' style={firstButtonStyle} onClick={(e: unknown) => handleFirstButtonClick ? handleFirstButtonClick(helperProps) : onRequestClose?.({ event: e as MouseEvent, isMask: false, isOverlay: false })}>
                <span>Skip</span>
              </button>
            )
          }
          <button className='tour-helper-button outline' style={lastButtonStyle} onClick={() => handleLastButtonClick ? handleLastButtonClick(helperProps) : handleNext()}>
              <span>{isLast ? 'Get Started':'Next'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
