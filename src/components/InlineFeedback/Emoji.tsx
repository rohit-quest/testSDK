import { useRef, useState } from 'react'
import { FeedBackComponentProps } from './types'
import { BigSmile, Happy, NeutralFace, Sarcastic, Smile } from './svg'

export default function Emoji({
    onChange, 
    count, 
    style, 
    buttonStyle, 
    selectedButtonStyle,
    initialState = -1
}: FeedBackComponentProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(initialState)
    const emojies = useRef([Sarcastic, NeutralFace, Smile, BigSmile, Happy]).current

    const updateSelected = (index: number) => {
        setSelectedIndex(index)
        onChange({total: emojies.length, rate: index + 1})
    }
    return (
    <div className={`feedbackEmojiContainer`} style={{...style}}>
        {
            emojies.map((emoji, i) => (
                <div key={i} className={selectedIndex == i ? `feedbackEmojiSelected`:undefined} onClick={() => updateSelected(i)} style={{...(selectedIndex == i ? selectedButtonStyle:buttonStyle)}}>
                    {emoji}
                </div>
            ))
        }
    </div>
  )
}
