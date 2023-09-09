import React, { FC } from 'react';


interface CreditButtonProps {
    remainingCount: React.ReactNode;
    addButton: boolean;
    fontSize: string;
    buttonFunction: () => void;
    btnText: string;
}



const CreditButton: FC<CreditButtonProps> = ({ remainingCount, fontSize, addButton, btnText, buttonFunction }) => {


    return (
        <div className='questLabs'>
            <div className='flex bg-white rounded-xl shadow-lg relative py-6 px-14 w-fit gap-12 items-center'>
                <p className="text-lg font-bold text-gray-700" style={{ fontSize: `${fontSize}` }}>Remaining credits : <span className='text-black'>{remainingCount}</span></p>
                {
                    !!addButton &&
                    <button onClick={() => buttonFunction()} className='text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base py-3 px-5'>{btnText}</button>
                }
            </div>
        </div>
    )
}


export default CreditButton;