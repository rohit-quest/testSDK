import { useRef, useState } from 'react'
import { FeedBackComponentProps } from './types'

const StarSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="42" viewBox="0 0 45 42" fill="none">
        <path d="M14.8381 12.674L2.07807 14.524L1.85207 14.57C1.50995 14.6608 1.19806 14.8408 0.948255 15.0916C0.69845 15.3423 0.519678 15.6549 0.430195 15.9974C0.340713 16.3399 0.343725 16.7 0.438926 17.0409C0.534127 17.3818 0.718104 17.6914 0.972071 17.938L10.2161 26.936L8.03607 39.646L8.01007 39.866C7.98913 40.2199 8.0626 40.5729 8.22297 40.889C8.38334 41.2051 8.62484 41.4729 8.92274 41.665C9.22064 41.8571 9.56425 41.9666 9.91837 41.9822C10.2725 41.9979 10.6244 41.9191 10.9381 41.754L22.3501 35.754L33.7361 41.754L33.9361 41.846C34.2662 41.976 34.625 42.0159 34.9756 41.9615C35.3262 41.9071 35.656 41.7605 35.9313 41.5365C36.2065 41.3126 36.4172 41.0195 36.5417 40.6873C36.6663 40.3551 36.7002 39.9957 36.6401 39.646L34.4581 26.936L43.7061 17.936L43.8621 17.766C44.0849 17.4915 44.231 17.1629 44.2855 16.8135C44.34 16.4642 44.3009 16.1067 44.1722 15.7774C44.0436 15.4481 43.8299 15.1588 43.553 14.939C43.2762 14.7191 42.946 14.5766 42.5961 14.526L29.8361 12.674L24.1321 1.11393C23.967 0.778995 23.7115 0.496956 23.3945 0.299734C23.0774 0.102513 22.7115 -0.00201416 22.3381 -0.00201416C21.9647 -0.00201416 21.5987 0.102513 21.2817 0.299734C20.9646 0.496956 20.7091 0.778995 20.5441 1.11393L14.8381 12.674Z" fill="rgba(226, 226, 226, 1)"/>
    </svg>
)

export default function Star({
    onChange, 
    count, 
    style, 
    buttonStyle, 
    selectedButtonStyle,
    initialState = -1
}: FeedBackComponentProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(initialState)
    const emojies = useRef(Array(count).fill(StarSvg)).current

    const updateSelected = (index: number) => {
        setSelectedIndex(index)
        onChange({total: emojies.length, rate: index + 1})
    }
    return (
    <div className={`feedbackStarContainer`} style={{...style}}>
        {
            emojies.map((emoji, i) => (
                <div key={i} className={selectedIndex >= i ? `feedbackStarSelected`:undefined} onClick={() => updateSelected(i)} style={{...(selectedIndex == i ? selectedButtonStyle:buttonStyle)}}>
                    {emoji}
                </div>
            ))
        }
    </div>
  )
}
