import React, { CSSProperties } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: CSSProperties | undefined
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, style }) => {

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target = e.target as Element;
    if (ref.current?.contains(target)) {
    } else {
      onClose && onClose();
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <div className="q_modal_overlay" onClick={(e) => closeModal(e)}>
          <div className="q_modal" ref={ref} id='modal_box' style={style}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
