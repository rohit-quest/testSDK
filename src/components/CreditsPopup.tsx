import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import creditBanner from "../assets/images/creditBanner.png";
import cross from "../assets/images/cross.png"

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  headingText: React.ReactNode;
  descText: React.ReactNode;
  isCloseble: boolean;
  continueButton: boolean;
  buttonText: string;
  buttonFunction: () => void;
}

const CreditsPopup: FC<PopupProps> = ({ isOpen, onClose, headingText, descText, isCloseble, continueButton, buttonText, buttonFunction }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup w-full h-full backdrop-blur-sm absolute flex items-center justify-center">
        <div className='w-96 bg-white rounded-xl shadow-lg relative p-6'>
            <img src={creditBanner}/>
            {
              !!isCloseble &&
              <img src={cross} alt="" onClick={() => onClose(false)} className='w-8 absolute top-6 right-6 cursor-pointer'/>
            }
            <p className='font-bold text-lg text-center mt-3'>{headingText}</p>
            <p className='text-base text-center mt-3'>{descText}</p>
            {
              !!continueButton &&
              <button className='text-black border-2 border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg py-2 w-full mt-3' onClick={() => buttonFunction()}>{buttonText}</button>
            }
        </div>
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default CreditsPopup;
