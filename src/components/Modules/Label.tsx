import {CSSProperties} from 'react';

interface Proptype {
    htmlFor: string;
    style?: CSSProperties;
    text: string;
    isRequired: boolean
}

const Label = ({htmlFor, style, text, isRequired}: Proptype) => {
    return (
        <label htmlFor={htmlFor} style={style}>{text} {isRequired && "*"}</label>
    );
}

export default Label;
