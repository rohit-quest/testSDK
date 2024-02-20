import {CSSProperties} from 'react';

interface Proptype {
    htmlFor?: string;
    style?: CSSProperties;
    children?: string;
    className?: string;
}

const Label = ({htmlFor, style, children, className}: Proptype) => {
    return (
        <label htmlFor={htmlFor} style={style} className={`q_module_lebels ${className}`}>{children}</label>
    );
}

export default Label;
