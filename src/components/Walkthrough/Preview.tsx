import React, { useEffect, useState } from 'react'
import Walkthrough, { Align, Position } from './Walkthrough';

export default function Preview() {
    const [isOpen, setIsOpen] = useState(true)

    const boxStyles = {
        margin: '10px',
        display: 'inline-block',
        padding: '20px',
        color: 'white',
    };

    return (
        <div className="App" style={{ display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0, height: '2000px' }}>
            <div className="box box1" style={{ ...boxStyles, width: '100px', height: '100px', backgroundColor: 'red' }}>
                <p>Red Box with some text</p>
            </div>
            <div className="box box2" style={{ ...boxStyles, width: '150px', height: '150px', backgroundColor: 'blue' }}>
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
            </div>
            <div className="box box3" style={{ ...boxStyles, width: '200px', height: '200px', backgroundColor: 'green' }}>
                <button>Click Me</button>
            </div>
            <div className="box box4" style={{ ...boxStyles, width: '250px', height: '250px', backgroundColor: 'yellow', color: 'black' }}>
                <p>Yellow Box with some more text</p>
            </div>
            <div className="box box5" style={{ ...boxStyles, width: '300px', height: '300px', backgroundColor: 'orange' }}>
                <img src="https://via.placeholder.com/300" alt="Placeholder" />
            </div>
            <div className="box box6" style={{ ...boxStyles, width: '350px', height: '350px', backgroundColor: 'purple' }}>
                <button>Another Button</button>
            </div>
            <div className="box box7" style={{ ...boxStyles, width: '400px', height: '400px', backgroundColor: 'pink', color: 'black' }}>
                <p>Pink Box with different text</p>
            </div>
            <div className="box box8" style={{ ...boxStyles, width: '450px', height: '450px', backgroundColor: 'brown' }}>
                <img src="https://via.placeholder.com/450" alt="Placeholder" />
            </div>
            {/* Duplicate boxes to ensure scroll height */}
            <div className="box box9" style={{ ...boxStyles, width: '100px', height: '100px', backgroundColor: 'red' }}>
                <p>Duplicate Red Box with text</p>
            </div>
            <div className="box box10" style={{ ...boxStyles, width: '150px', height: '150px', backgroundColor: 'blue' }}>
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
            </div>
            <div className="box box11" style={{ ...boxStyles, width: '200px', height: '200px', backgroundColor: 'green' }}>
                <button>Click Me Again</button>
            </div>
            <div className="box box12" style={{ ...boxStyles, width: '250px', height: '250px', backgroundColor: 'yellow', color: 'black' }}>
                <p>Duplicate Yellow Box with text</p>
            </div>
            <div className="box box13" style={{ ...boxStyles, width: '300px', height: '300px', backgroundColor: 'orange' }}>
                <img src="https://via.placeholder.com/300" alt="Placeholder" />
            </div>
            <div className="box box14" style={{ ...boxStyles, width: '350px', height: '350px', backgroundColor: 'purple' }}>
                <button>Yet Another Button</button>
            </div>
            <div className="box box15" style={{ ...boxStyles, width: '400px', height: '400px', backgroundColor: 'pink', color: 'black' }}>
                <p>Duplicate Pink Box with text</p>
            </div>
            <div className="box box8" style={{ ...boxStyles, width: '450px', height: '450px', backgroundColor: 'brown' }}>
                <img src="https://via.placeholder.com/450" alt="Placeholder" />
            </div>
            <Walkthrough
                id="app"
                isOpen={isOpen}
                steps={Array.from({ length: 15 }, (_, index) => ({ selector: `.box${index + 1}`, data: { title: `Box ${index + 1}`, description: `Box ${index + 1} description.` } }))}
                onComplete={() => { alert('Welcome to the page'); setIsOpen(false) }}
                onRequestClose={() => setIsOpen(false)}
                onAfterOpen={() => document.documentElement.style.overflow = 'hidden'}
                onBeforeClose={() => document.documentElement.style.overflow = ''}
                tooltip
            />
        </div>
    )
}
