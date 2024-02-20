import {CSSProperties} from 'react';
import './css/label.css';

interface Proptype {
    htmlFor?: string;
    style?: CSSProperties;
    text: string;
    isRequired?: boolean
}

const Label = ({htmlFor, style, text, isRequired}: Proptype) => {
    return (
        <label className='q_default_label' htmlFor={htmlFor} style={style}>{text} {isRequired && "*"}</label>
    );
}

export default Label;
