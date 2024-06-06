import { CSSProperties, useEffect, useRef, useState } from 'react'
import { TourHelperProps } from './types'
import { Align } from './Walkthrough';

export default function TourHelperTooltip({
  currentStep,
  hideArrow,
  arrowStyle,
  onRequestClose,
  next,
  onComplete,
  currentStepIndex,
  steps
}: TourHelperProps) {
  const [target, setTarget] = useState<Element | null>(null)
  const [showArrow, setShowArrow] = useState(false)
  const [tooltipBoundingRect, setTooltipBoundingRect] = useState<DOMRect>()

  const tooltip = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentStep) {
      let targetElm = document.querySelector(currentStep.selector)
      setTarget(targetElm)
    }
  }, [currentStep])

  useEffect(() => {
    let mainTourHelper = tooltip.current?.parentElement

    const updateRect = () => {
      setTooltipBoundingRect(mainTourHelper?.getBoundingClientRect())
      setShowArrow(true)
    }

    mainTourHelper?.addEventListener('transitionend', updateRect)

    return () => {
      mainTourHelper?.removeEventListener('transitionend', updateRect)
    }
  }, [])


  const style: CSSProperties = {
    opacity: showArrow ? 1:0,
    ...arrowStyle
  }

  if (target && tooltip.current && tooltipBoundingRect) {
    let targetBoundingRect = target.getBoundingClientRect()

    // target direction
    let isLeft = targetBoundingRect.right < tooltipBoundingRect.left
    let isRight = targetBoundingRect.left > tooltipBoundingRect.right
    let isTop = targetBoundingRect.bottom < tooltipBoundingRect.top
    let isBottom = targetBoundingRect.top > tooltipBoundingRect.bottom


    if (isLeft) {
      style.left = '0%'
    }
    if (isTop) {
      style.top = '0%'
    }
    if (isRight) {
      style.left = '100%'
    }
    if (isBottom) {
      style.top = '100%'
    }

    if(isTop || isBottom){
      if (currentStep?.align == Align.START || currentStep?.align == undefined) {
        style.left = '0%'
        style.translate = `100% -50%`
      }
      if (currentStep?.align == Align.CENTER) {
        style.left = '50%'
        style.translate = `-50% -50%`
      }
      if (currentStep?.align == Align.END) {
        style.left = '100%'
        style.translate = `-200% -50%`
      }
    }

    if(isLeft || isRight){
      if (currentStep?.align == Align.START || currentStep?.align == undefined) {
        style.top = '0%'
        style.translate = `-50% 100%`
      }
      if (currentStep?.align == Align.CENTER) {
        style.top = '50%'
        style.translate = `-50% -50%`
      }
      if (currentStep?.align == Align.END) {
        style.top = '100%'
        style.translate = `-50% -200%`
      }
    }

    style.rotate = '45deg'
  }



  const isFirst = currentStepIndex == 0
  const isLast = currentStepIndex == (steps.length - 1)

  const handleNext = () => {
    if(isLast) return onComplete?.()
    setShowArrow(false)
    next()
  }


  return (
    <div className='tour-helper-tooltip' ref={tooltip}>
      {
        hideArrow ? null:<div className='tour-helper-tooltip-pointer' style={style} />
      }
      
      <div className='tour-helper-content'>
        <div className='tour-helper-tooltip-details'>
          <h1>{currentStep?.data?.title}</h1>
          <p>{currentStep?.data?.description}</p>
        </div>
        <div className="tour-helper-tooltip-button">
          <button className='tour-helper-button transparent' onClick={(e: unknown) => onRequestClose?.({ event: e as MouseEvent, isMask: false, isOverlay: false })}>
            <span>Skip</span>
          </button>
          <button className='tour-helper-button outline' onClick={handleNext}>
              <span>{isLast ? 'Get Started':'Next'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
