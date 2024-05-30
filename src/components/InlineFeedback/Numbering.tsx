import { useRef, useState } from 'react'
import { FeedBackComponentProps } from './types'

export default function Numbering({
    onChange, 
    count, 
    style, 
    buttonStyle, 
    selectedButtonStyle,
    initialState = -1
}: FeedBackComponentProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(initialState)
    const emojies = useRef(Array(count).fill(0)).current

    const updateSelected = (index: number) => {
        setSelectedIndex(index)
        onChange({total: emojies.length, rate: index + 1})
    }
    return (
    <div className={`feedbackNumberContainer`} style={{...style}}>
        {
            emojies.map((n, i) => (
                <div key={i} className={selectedIndex == i ? `feedbackNumberSelected`:undefined} onClick={() => updateSelected(i)} style={{...(selectedIndex == i ? selectedButtonStyle:buttonStyle)}}>
                    {i + 1}
                </div>
            ))
        }
    </div>
  )
}
