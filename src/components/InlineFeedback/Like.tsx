import React, { useState } from 'react'
import { FeedBackComponentProps } from './types'

function Like({
  onChange,
  count,
  style, 
  buttonStyle, 
  selectedButtonStyle, 
  iconStyle, 
  selectedIconStyle,
  initialState = -1
}: FeedBackComponentProps) {
  const [isLike, setIsLike] = useState<number>(initialState)

  
  const updateValue = (value: number) => {
    setIsLike(value)
    // onChange({like: isLike == 1})
    onChange({like: value == 1})
  }

  return (
    <div className={`feedbackNumbering`} style={{...style}}>
        <div className={isLike != 0 ? undefined:`feedbackNumberingSelected`} onClick={() => updateValue(0)} style={{...(isLike ? buttonStyle:selectedButtonStyle)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M4.49504 23.2034C4.96346 23.7665 5.55027 24.2195 6.2137 24.53C6.87713 24.8406 7.60086 25.0011 8.33337 25H15.9334L15.1267 27.1617C14.5611 28.5904 14.4677 30.1627 14.86 31.6484C15.2662 33.0914 16.1324 34.3624 17.327 35.2682C18.5216 36.174 19.9792 36.665 21.4784 36.6667C21.8015 36.6669 22.1178 36.5735 22.389 36.3978C22.6602 36.2221 22.8747 35.9717 23.0067 35.6767L27.7517 24.9967V3.33335H10.4567C9.2855 3.33325 8.15142 3.7443 7.25227 4.4948C6.35312 5.24532 5.74597 6.28766 5.53671 7.44002L3.41504 19.1067C3.28302 19.8269 3.31135 20.5674 3.49801 21.2755C3.68468 21.9836 4.0251 22.6418 4.49504 23.2034Z" fill="#E2E2E2"style={isLike ? iconStyle:selectedIconStyle} />
            <path d="M27.75 25H31.6666C32.9923 24.9987 34.2633 24.4715 35.2007 23.5341C36.1381 22.5967 36.6653 21.3257 36.6666 20V8.33333C36.6653 7.00766 36.1381 5.73666 35.2007 4.79926C34.2633 3.86186 32.9923 3.33466 31.6666 3.33333H27.75V24.9967V25Z" fill="#AFAFAF" style={isLike ? iconStyle:selectedIconStyle} opacity={.5}/>
            </svg>
        </div>
        <div className={isLike != 1 ? undefined:`feedbackNumberingSelected`} onClick={() => updateValue(1)} style={{...(isLike ? selectedButtonStyle:buttonStyle)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M42.608 20.1591C42.0459 19.4833 41.3417 18.9397 40.5456 18.5671C39.7494 18.1944 38.881 18.0019 38.002 18.0031H28.882L29.85 15.4091C30.5287 13.6946 30.6408 11.8079 30.17 10.0251C29.6825 8.29342 28.6431 6.7682 27.2096 5.68126C25.7761 4.59431 24.0269 4.00508 22.228 4.00311C21.8402 4.00291 21.4607 4.11498 21.1352 4.3258C20.8098 4.53661 20.5523 4.83715 20.394 5.19111L14.7 18.0071V44.0031H35.454C36.8594 44.0032 38.2203 43.51 39.2993 42.6094C40.3783 41.7088 41.1068 40.458 41.358 39.0751L43.904 25.0751C44.0624 24.2108 44.0284 23.3222 43.8044 22.4725C43.5804 21.6229 43.1719 20.833 42.608 20.1591Z" fill="#E2E2E2"style={isLike ? selectedIconStyle:iconStyle} />
            <path d="M14.6984 18H9.99841C8.4076 18.0016 6.8824 18.6342 5.75753 19.7591C4.63265 20.884 4 22.4092 3.99841 24V38C4 39.5908 4.63265 41.116 5.75753 42.2409C6.8824 43.3658 8.4076 43.9984 9.99841 44H14.6984V18.004V18Z" fill="#AFAFAF" style={isLike ? selectedIconStyle:iconStyle} opacity={.5}/>
            </svg>
        </div>
    </div>
  )
}

export default Like