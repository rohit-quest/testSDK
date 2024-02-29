import React from 'react'
const createUrl = (string="") => `data:image/svg+xml,${encodeURIComponent(string)}`

interface propType {
    svgString: string;
    alt: string;
    onclick?: () => void;
    style?: React.CSSProperties;
}

export default function Icon({ 
    svgString,
    alt,
    onclick,
    style
}: propType) {
    return (
        <img src={createUrl(svgString)} onClick={onclick} style={style} alt={alt} />
    )
}
