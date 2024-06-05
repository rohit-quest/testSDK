import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TourHelperProps } from './types'
import { Position } from './Walkthrough';

export default function TourHelperTooltip({
  currentStep,
  onRequestClose,
  next,
}: TourHelperProps) {
  
  const tooltip = useRef<HTMLDivElement>(null)
  const pointer = useRef<HTMLDivElement>(null);

  // arrow pointer
  // const element = useMemo(() => document.querySelector(currentStep?.selector || ''), [currentStep?.selector])
  
  // if(element != null && tooltip.current  != null && pointer.current != null){
  //   let maskBoundingRect = element.getBoundingClientRect()
  //   let tooltipBoundingRect = tooltip.current.getBoundingClientRect()

  //   let isLeft = tooltipBoundingRect.right < maskBoundingRect.left || currentStep?.position == Position.LEFT
  //   let isRight = tooltipBoundingRect.left > maskBoundingRect.right || currentStep?.position == Position.RIGHT
  //   let isTop = tooltipBoundingRect.bottom < maskBoundingRect.top || currentStep?.position == Position.TOP
  //   let isBottom = tooltipBoundingRect.top > maskBoundingRect.bottom || currentStep?.position == Position.BOTTOM

  //   let y = Math.max(0, Math.min(pointer.current.offsetHeight, maskBoundingRect.top + (maskBoundingRect.height / 2)));
  //   let x = Math.max(0, Math.min(pointer.current.offsetTop, maskBoundingRect.left + (maskBoundingRect.width / 2)));
    
  //   if(isRight){
  //     pointer.current.style.left = '0px'
  //     pointer.current.style.translate = `-50%`
  //     pointer.current.style.rotate = '45deg'  
  //     pointer.current.style.top = `${y}px` 
  //   }
  //   if(isTop){
  //     pointer.current.style.left = `${x}px`
  //     pointer.current.style.translate = `0 -50%`
  //     pointer.current.style.rotate = '45deg'  
  //     pointer.current.style.top = `0px`  
  //   }
  //   console.log({isLeft, isRight, isTop, isBottom})
  // }
 
  

  return (
    <div className='tour-helper-tooltip' ref={tooltip}>
      {/* <div className='tour-helper-tooltip-pointer' ref={pointer}/> */}
      <div className='tour-helper-content'>
        <div className='tour-helper-tooltip-details'>
          <h1>{currentStep?.data?.title}</h1>
          <p>{currentStep?.data?.description}</p>
        </div>
        <div className="tour-helper-tooltip-button">
          <button className='tour-helper-button transparent' onClick={(e: unknown) => onRequestClose?.({event: e as MouseEvent, isMask: false})}>Skip</button>
          <button className='tour-helper-button outline' onClick={next}>Next</button>
        </div>
      </div>
    </div>
  )
}
