// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { ReferEarn } from './components/Refer/ReferEarn';
// import ReferEarnPreview from './components/expansion/Preview';
// // ReferEarn
// // ReferEarnPreview

// function HelloWorld() {
//     const [count, setCount] = React.useState(0);
//     const classes = document.getElementById('root');
//     console.log(classes)
//     React.useEffect(() => {
//         console.log("use")
//         console.log(count)
//     }, [count]);
//     return (
//         <div>
//             <ReferEarnPreview />
//         </div>
//     );
// }
function hello() {
    console.log("running");
    const rootElement = document.getElementById('root');
    console.log(rootElement)
    // if (rootElement) {
    //     const root = createRoot(rootElement);
    //     root.render(<HelloWorld />);
    // } else {
    //     console.error('Root element with id "root" not found. Cannot render React app.');
    // }
}
hello();
// ReactDOM.render(<HelloWorld />, document.getElementById('root'));
if (typeof document !== 'undefined') {
    console.log("render")
    const rootElement = document.getElementById('root');
    console.log(rootElement)
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<HelloWorld />);
    } else {
        console.error('Root element with id "root" not found. Cannot render React app.');
    }
} else {
    console.log("Else no render")
    console.error('The document object is not available. Cannot render React app.');
}
