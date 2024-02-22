import { CSSProperties, useContext } from 'react';
import QuestContext from '../components/QuestWrapper';

const createUrl = (string = "#B9B9B9") => `data:image/svg+xml,${encodeURIComponent(string)}`

const questPowered = (color: string = "#B9B9B9") => createUrl(`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z" fill="${color}"/>
<path d="M12 8L8 8L8 12H12V8Z" fill="${color}"/>
</svg>
`)

interface QuestLabsProps {
    style?: CSSProperties | undefined;
    icon?: boolean;
}

export default function QuestLabs({ style, icon = true }: QuestLabsProps) {
    const { themeConfig } = useContext(QuestContext.Context)
    console.log(style)
    return (
        <div style={{ color: themeConfig.secondaryColor, ...style }} onClick={() => { window.open("https://www.questlabs.ai/", "_blank") }} className='powered_by_quest'>
            <div style={{color: themeConfig.secondaryColor||style?.color}}>Powered by Quest Labs</div>
            {icon && <img src={questPowered(style?.color || themeConfig.secondaryColor)} alt="" />}
        </div>
    )
}
