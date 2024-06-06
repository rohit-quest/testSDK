import { useState } from 'react'
import { TourHelperProps } from './types'

export default function TourHelperTooltip({
  currentStep,
  hideArrow,
  onRequestClose,
  next,
  onComplete,
  currentStepIndex,
  steps
}: TourHelperProps) {
  const [showArrow, setShowArrow] = useState(false)

  const isFirst = currentStepIndex == 0
  const isLast = currentStepIndex == (steps.length - 1)

  const handleNext = () => {
    if(isLast) return onComplete?.()
    next()
  }


  return (
    <div className='tour-helper-tooltip'>
      {
        hideArrow ? null:<div className='tour-helper-tooltip-pointer' />
      }
      <div className='tour-helper-content'>
        <div className={`tour-helper-tooltip-details ${showArrow ? 'show':'hide'}`} >
          <h1>{currentStep?.data?.title}</h1>
          <p>{currentStep?.data?.description}</p>
        </div>
        <div className="tour-helper-tooltip-button">
          {
            !isLast && (
              <button className='tour-helper-button transparent' onClick={(e: unknown) => onRequestClose?.({ event: e as MouseEvent, isMask: false, isOverlay: false })}>
                <span>Skip</span>
              </button>
            )
          }
          <button className='tour-helper-button outline' onClick={handleNext}>
              <span>{isLast ? 'Get Started':'Next'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
