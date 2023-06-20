import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => Promise<void>;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({message, onConfirm, onCancel}) => {

    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (type: string) => {
        modalRef.current && modalRef.current.classList.add('pop-out');
        setTimeout(() => {
            type === 'yes' ? onConfirm() : onCancel();
            modalRef.current && modalRef.current.classList.remove('pop-out');
        }, 150)
    }

    return (
    <>
      <div className="modal-container">
        <div className="modal-content" ref={modalRef}>
            <header>
                <p>Confirmation</p>
                <FontAwesomeIcon
                  icon={faX}
                  className='x-icon'
                  onClick={() => handleClick('no')}/>
            </header>
            <p>{message}</p>
            <div className="modal-content-buttons">
                <button onClick={() => handleClick('yes')}>Yes</button>
                <button onClick={() => handleClick('no')}>No</button>
            </div>
        </div>
      </div>
    </>
    );
}

export default ConfirmationModal;