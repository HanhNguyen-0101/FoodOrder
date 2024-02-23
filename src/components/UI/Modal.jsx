import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({children, open, className, onClose}) {
    const modal = useRef();

    useEffect(() => {
        if (open) {
            modal.current.showModal();
        }
        return () => modal.current.close();
    }, [open]);

    return (
        createPortal(<dialog ref={modal} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal'))
    );
}

export default Modal;