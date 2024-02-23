import { CSSProperties, useContext } from 'react';
import './css/label.css';
import QuestContext from '../QuestWrapper';

interface Proptype {
    htmlFor?: string;
    style?: CSSProperties;
    children?: string;
    className?: string;
}

const Label = ({ htmlFor, style, children, className }: Proptype) => {
    const { themeConfig } = useContext(QuestContext.Context);

    return (
        <label htmlFor={htmlFor} style={{color: themeConfig.primaryColor,...style}} className={`q_module_lebels ${className || ''}`}>{children}</label>
    );
}

export default Label;
