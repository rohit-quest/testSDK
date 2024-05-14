import { CSSProperties } from 'react'
import { ClientBoundingRect } from 'tour-navigator/lib/TourNavigator/types';

interface OverlayProps extends ClientBoundingRect{
    id: string;
    style?: CSSProperties,
    maskStyle?: CSSProperties,
    maskOpacity?: number,
    maskRadius?: number,
    overlayFill?: string,
    overlayOpacity?: number
}

export default function Overlay({
    id,
    x,
    y,
    height,
    width,
    style,
    maskRadius = 5,
    maskOpacity = 1,
    maskStyle,
    overlayFill = 'black',
    overlayOpacity = .5
}: OverlayProps) {
  return (
    <svg height='100%' width='100%'>
        <defs>
            <mask id={id}>
                <rect x={0} y={0} height={'100%'} width={'100%'} fill='white' />
                <rect
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                    fill='black'
                    rx={maskRadius}
                    opacity={maskOpacity}
                    style={maskStyle}
                />
            </mask>
        </defs>
        <rect 
            x={0} 
            y={0} 
            height={'100%'} 
            width={'100%'} 
            fill={overlayFill} 
            opacity={overlayOpacity} 
            mask={`url(#${id})`} 
            style={style}
        />
    </svg>
  )
}
