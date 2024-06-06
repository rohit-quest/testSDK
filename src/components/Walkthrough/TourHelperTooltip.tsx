import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { TourHelperProps } from './types'
import { Position } from './Walkthrough';

export default function TourHelperTooltip({
  currentStep,
  onRequestClose,
  next,
}: TourHelperProps) {
  // const [target, setTarget] = useState<Element | null>(null)
  // const [tooltipBoundingRect, setTooltipBoundingRect] = useState<DOMRect>()

  // const tooltip = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if(currentStep){
  //     let targetElm = document.querySelector(currentStep.selector)
  //     setTarget(targetElm)
  //   }
  // }, [currentStep])

  // useEffect(() => {
  //   let mainTourHelper = tooltip.current?.parentElement

  //   const updateRect = () => {
  //     setTooltipBoundingRect(mainTourHelper?.getBoundingClientRect())
  //   }

  //   mainTourHelper?.addEventListener('transitionend', updateRect)

  //   return () => {
  //     mainTourHelper?.removeEventListener('transitionend', updateRect)
  //   }
  // }, [])


  // const style: CSSProperties = {opacity: 0}

  // if(target && tooltip.current && tooltipBoundingRect){
  //   let targetBoundingRect = target.getBoundingClientRect()

  //   let targetCenterY = targetBoundingRect.y + targetBoundingRect.height / 2
  //   let targetCenterX = targetBoundingRect.x + targetBoundingRect.width / 2

  //   // target direction
  //   let isLeft = targetBoundingRect.right < tooltipBoundingRect.left
  //   let isRight = targetBoundingRect.left > tooltipBoundingRect.right
  //   let isTop = targetBoundingRect.bottom < tooltipBoundingRect.top
  //   let isBottom = targetBoundingRect.top > tooltipBoundingRect.bottom

  //   let left = 0, top = 0;

  //   if(isLeft){
  //     left = 0
  //     top = Math.min(Math.max(0, targetCenterY - tooltipBoundingRect.y), tooltipBoundingRect.height)
  //   }
  //   if(isRight){
  //     left = tooltipBoundingRect.width
  //     top = Math.min(Math.max(0, targetCenterY - tooltipBoundingRect.y), tooltipBoundingRect.height)
  //   }
  //   if(isTop){
  //     top = 0
  //     left = Math.min(Math.max(0, targetCenterX - tooltipBoundingRect.x), tooltipBoundingRect.width)
  //   }
  //   if(isBottom){
  //     top = tooltipBoundingRect.height
  //     left = Math.min(Math.max(0, targetCenterX - tooltipBoundingRect.x), tooltipBoundingRect.width)
  //   }

  //   let isTopLeftCorner = left == 0 && top == 0
  //   let isTopRightCorner = left == tooltipBoundingRect.width && top == 0
  //   let isBottomRightCorner = left == tooltipBoundingRect.width && top == tooltipBoundingRect.height
  //   let isBottomLeftCornder = left == 0 && top == tooltipBoundingRect.height
  //   let isCorner = isTopLeftCorner || isTopRightCorner || isBottomRightCorner || isBottomLeftCornder

  //   style.left = `${left}px`
  //   style.top = `${top}px`
  //   style.rotate = `${isCorner ? 0:45}deg`
  //   style.translate = `-50% -50%`
  //   style.opacity = 1

  //   if(isBottomLeftCornder) {
  //     style.translate = `0% -100%`
  //   }
  //   if(isBottomRightCorner){
  //     style.translate = `-100% -100%`
  //   }
  //   if(isTopRightCorner){
  //     style.translate = `-100% 0`
  //   }
  //   if(isTopLeftCorner){
  //     style.translate = `0 0`
  //   }

  // }
  



  return (
    <div className='tour-helper-tooltip'>
      {/* <div className='tour-helper-tooltip-pointer'/> */}
      <div className='tour-helper-content'>
        <div className='tour-helper-tooltip-details'>
          <h1>{currentStep?.data?.title}</h1>
          <p>{currentStep?.data?.description}</p>
        </div>
        <div className="tour-helper-tooltip-button">
          <button className='tour-helper-button transparent' onClick={(e: unknown) => onRequestClose?.({event: e as MouseEvent, isMask: false, isOverlay: false})}>Skip</button>
          <button className='tour-helper-button outline' onClick={next}>Next</button>
        </div>
      </div>
    </div>
  )
}
